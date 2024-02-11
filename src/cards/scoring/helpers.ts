import { getDwellersOfForest, getDwellersOfTree } from "../helpers";
import { Card, CardType, Forest, Game, TreeSymbol } from "../types";

interface CardFilter {
  names?: string[];
  types?: CardType[];
  treeSymbols?: TreeSymbol[];
}

interface CountOptions {
  ignoreModifiers?: boolean;
}

const applyFilter = <Type extends Card>(
  cards: Type[],
  { names, types, treeSymbols }: CardFilter,
): Type[] =>
  cards
    .filter((c) => !names || names.includes(c.name))
    .filter((c) => !types || types.some((t) => c.types.includes(t)))
    .filter(
      (c) =>
        !treeSymbols || (c.treeSymbol && treeSymbols.includes(c.treeSymbol)),
    );

export const countTrees = (
  forest: Forest,
  filter: CardFilter = {},
  { ignoreModifiers }: CountOptions = {},
): number => {
  const trees = applyFilter(forest.trees, filter);

  let count = trees.length;
  if (!ignoreModifiers) {
    count += trees
      .flatMap(getDwellersOfTree)
      .map((d) => d.modifiers.treeCount)
      .reduce((a, b) => a + b, 0);
  }

  return count;
};

export const countDwellers = (
  forest: Forest,
  filter: CardFilter = {},
): number => applyFilter(getDwellersOfForest(forest), filter).length;

export const countCards = (
  forest: Forest,
  filter: CardFilter = {},
  options: CountOptions = {},
): number =>
  countTrees(forest, filter, options) + countDwellers(forest, filter);

export const countCardNames = (forest: Forest, names: string[]): number =>
  countCards(forest, { names }, { ignoreModifiers: false });

export const countCardTypes = (forest: Forest, types: CardType[]): number =>
  countCards(forest, { types }, { ignoreModifiers: true });

export const countTreeSymbols = (
  forest: Forest,
  treeSymbols: TreeSymbol[],
): number => countCards(forest, { treeSymbols }, { ignoreModifiers: true });

export const hasAllTreeSpecies = (forest: Forest) => {
  const treeSymbols = new Set(
    forest.trees.map((t) => t.treeSymbol).filter((t) => !!t),
  );
  return Object.values(TreeSymbol).every((s) => treeSymbols.has(s));
};

export const scoreByCardMajority = (
  game: Game,
  forest: Forest,
  pointsMinority: number,
  pointsMajority: number,
  filter: CardFilter = {},
  options: CountOptions = {},
): number => {
  const count = countCards(forest, filter, options);
  const maxCount = Math.max(
    ...Object.values(game.forests).map((f) => countCards(f, filter, options)),
  );

  return count === maxCount ? pointsMajority : pointsMinority;
};

export const scoreSet = (
  forest: Forest,
  card: Card,
  pointsByCount: { [count: number]: number },
  options: CountOptions = {},
): number => {
  const filter = { names: [card.name] };
  const cards = [
    ...applyFilter(forest.trees, filter),
    ...applyFilter(getDwellersOfForest(forest), filter),
  ];

  // Sets are supposed to be scored once for all matching cards
  if (cards.some((c) => c.id < card.id)) {
    return 0;
  }

  const count = countCards(forest, filter, options);
  return pointsByCount[count] ?? 0;
};
