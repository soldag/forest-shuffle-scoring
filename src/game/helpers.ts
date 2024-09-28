import { createSapling } from "./factory";
import {
  Card,
  CardType,
  DwellerCard,
  DwellerPosition,
  Forest,
  Game,
  WoodyPlantCard,
} from "./types";

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

  const candidates = game.deck.dwellers.filter((d) => d.position === position);
  const presentDwellers = woodyPlant.dwellers[position].filter(
    (d) => d.id !== ignoreDweller?.id,
  );
  if (presentDwellers.length === 0) {
    return candidates;
  }

  const dwellerNames = presentDwellers
    .filter(
      (d1) =>
        d1.modifiers.sharesSlotWith >
        presentDwellers.filter((d2) => d2.name === d1.name).length - 1,
    )
    .map((d) => d.name);

  return candidates.filter((d) => dwellerNames.includes(d.name));
};
