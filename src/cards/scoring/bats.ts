import { getDwellersOfForest } from "../helpers";
import { CardType, Forest } from "../types";

const MIN_COUNT = 3;
const POINTS = 5;

export const scoreBats = (forest: Forest): number => {
  const batNames = new Set(
    getDwellersOfForest(forest)
      .filter((c) => c.types.includes(CardType.Bat))
      .map((c) => c.name),
  );

  return batNames.size >= MIN_COUNT ? POINTS : 0;
};
