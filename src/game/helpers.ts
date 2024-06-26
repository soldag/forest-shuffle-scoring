import { createSapling } from "./factory";
import {
  Card,
  CardType,
  DwellerCard,
  DwellerPosition,
  Forest,
  Game,
  TreeCard,
} from "./types";

export const getDwellersOfTree = (tree: TreeCard): DwellerCard[] =>
  Object.values(tree.dwellers).flatMap((d) => d);

export const getDwellersOfForest = (forest: Forest) =>
  forest.trees.flatMap(getDwellersOfTree);

export const filterDwellers = (cards: Card[]) =>
  cards.filter((c) => !c.types.includes(CardType.Tree)) as DwellerCard[];

export const filterTrees = (cards: Card[]) =>
  cards.filter((c) => c.types.includes(CardType.Tree)) as TreeCard[];

export const getTreeCandidates = (game: Game) => [
  ...game.deck.trees,
  createSapling(),
];

export const getDwellerCandidates = (
  game: Game,
  treeId: string,
  position: DwellerPosition | null = null,
  ignoreDweller: DwellerCard | null = null,
): DwellerCard[] => {
  if (!position) {
    return Object.values(DwellerPosition)
      .map((p) => getDwellerCandidates(game, treeId, p, ignoreDweller))
      .flat();
  }

  const tree = Object.values(game.players)
    .flatMap((f) => f.forest.trees)
    .find((t) => t.id === treeId);
  if (!tree) {
    throw new Error("A tree with this id hasn't been played, yet.");
  }

  const candidates = game.deck.dwellers.filter((d) => d.position === position);
  const presentDwellers = tree.dwellers[position].filter(
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
