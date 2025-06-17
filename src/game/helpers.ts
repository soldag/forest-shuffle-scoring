import { createSapling } from "./factory";
import {
  Card,
  CardType,
  DwellerCard,
  DwellerPosition,
  Forest,
  Game,
  SlotSharingConfig,
  WoodyPlantCard,
} from "./types";

export const getForest = (game: Game, playerId: string): Forest | undefined =>
  game.players.find((p) => p.id === playerId)?.forest;

export const getDwellersOfWoodyPlant = (
  woodyPlant: WoodyPlantCard,
): DwellerCard[] => Object.values(woodyPlant.dwellers).flatMap((d) => d);

export const getDwellersOfForest = (forest: Forest) =>
  forest.woodyPlants.flatMap(getDwellersOfWoodyPlant);

export const filterTrees = (cards: Card[]) =>
  cards.filter((c) => c.types.includes(CardType.Tree)) as WoodyPlantCard[];

export const getWoodyPlantCandidates = (game: Game) => [
  ...game.deck.woodyPlants,
  createSapling(),
];

export const getDwellerCandidates = (
  game: Game,
  woodyPlantId: string,
  position: DwellerPosition | null = null,
  ignoreDweller: DwellerCard | null = null,
): DwellerCard[] => {
  if (!position) {
    return Object.values(DwellerPosition)
      .map((p) => getDwellerCandidates(game, woodyPlantId, p, ignoreDweller))
      .flat();
  }

  const woodyPlant = Object.values(game.players)
    .flatMap((f) => f.forest.woodyPlants)
    .find((w) => w.id === woodyPlantId);
  if (!woodyPlant) {
    throw new Error("A woody plant with this id hasn't been played, yet.");
  }

  const candidates = game.deck.dwellers
    .filter((d) => d.position === position)
    .filter((d) => d.modifiers?.canPlay?.({ woodyPlant, dweller: d }) ?? true);

  const dwellersInSlot = woodyPlant.dwellers[position].filter(
    (d) => d.id !== ignoreDweller?.id,
  );
  if (dwellersInSlot.length === 0) {
    return candidates;
  }

  const woodyPlantDwellers = getDwellersOfWoodyPlant(woodyPlant);
  return candidates.filter((candidate) => {
    // Pretend the candidate was added to the woody plant and check
    // if this is allowed by any of the woody plant's dwellers
    const newDwellersInSlot = [candidate, ...dwellersInSlot];
    const newWoodyPlantDwellers = [candidate, ...woodyPlantDwellers];

    return newWoodyPlantDwellers
      .map((d) => d.modifiers?.enablesSlotSharing?.({ woodyPlant, dweller: d }))
      .filter((c): c is SlotSharingConfig => !!c)
      .some((c) => canShareSlot(c, candidate, newDwellersInSlot));
  });
};

const canShareSlot = (
  config: SlotSharingConfig,
  candidate: DwellerCard,
  dwellers: DwellerCard[],
): boolean => {
  const { position, name, type, maxCards } = config;
  return (
    position === candidate.position &&
    (!name || dwellers.every((d) => d.name === name || d.countsAs === name)) &&
    (!type || dwellers.every((d) => d.types.includes(type))) &&
    (maxCards == null || dwellers.length <= maxCards)
  );
};
