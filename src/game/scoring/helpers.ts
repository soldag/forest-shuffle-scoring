import _ from "lodash";

import {
  filterTrees,
  getDwellersOfForest,
  getDwellersOfWoodyPlant,
} from "../helpers";
import { Card, CardType, Forest, Game, TreeSymbol } from "../types";

interface CardFilter {
  names?: string[];
  types?: CardType[];
  treeSymbols?: TreeSymbol[];
  distinctNames?: boolean;
}

interface CountOptions {
  ignoreModifiers?: boolean;
}

const applyFilter = <Type extends Card>(
  cards: Type[],
  { names, types, treeSymbols, distinctNames }: CardFilter,
): Type[] => {
  const result = cards
    .filter((c) => !names || names.includes(c.name))
    .filter((c) => !types || types.some((t) => c.types.includes(t)))
    .filter(
      (c) =>
        !treeSymbols || (c.treeSymbol && treeSymbols.includes(c.treeSymbol)),
    );

  return distinctNames ? _.uniqBy(result, (c) => c.name) : result;
};

export const countCards = (
  forest: Forest,
  filter: CardFilter = {},
  { ignoreModifiers }: CountOptions = {},
): number => {
  const woodyPlants = applyFilter(forest.woodyPlants, filter);
  const dwellers = applyFilter(getDwellersOfForest(forest), filter);
  let count = woodyPlants.length + dwellers.length;

  if (!ignoreModifiers) {
    for (const woodyPlant of woodyPlants) {
      for (const dweller of getDwellersOfWoodyPlant(woodyPlant)) {
        const context = { woodyPlant, dweller };
        count += dweller.modifiers?.woodyPlantCount?.(context) ?? 0;
      }
    }
  }

  return count;
};

export const countCardNames = (forest: Forest, names: string[]): number =>
  countCards(forest, { names }, { ignoreModifiers: false });

export const countCardTypes = (
  forest: Forest,
  types: CardType[],
  distinctNames: boolean = false,
): number =>
  countCards(forest, { types, distinctNames }, { ignoreModifiers: true });

export const countTreeSymbols = (
  forest: Forest,
  treeSymbols: TreeSymbol[],
): number => countCards(forest, { treeSymbols }, { ignoreModifiers: true });

export const countTreeSpecies = (forest: Forest) => {
  const treeSpecies = new Set(
    filterTrees(forest.woodyPlants).map((w) => w.countsAs ?? w.name),
  );
  return treeSpecies.size;
};

export const scoreByCount = (
  count: number,
  pointsByCount: { [count: number]: number },
) => {
  const cappedCount = Math.min(
    count,
    Math.max(0, ...Object.keys(pointsByCount).map((c) => parseInt(c, 10))),
  );

  return pointsByCount[cappedCount] ?? 0;
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
    ...game.players.map((p) => countCards(p.forest, filter, options)),
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
    ...applyFilter(forest.woodyPlants, filter),
    ...applyFilter(getDwellersOfForest(forest), filter),
  ];

  // Sets are supposed to be scored once for all matching cards
  if (cards.some((c) => c.id < card.id)) {
    return 0;
  }

  const count = countCards(forest, filter, options);
  return scoreByCount(count, pointsByCount);
};
