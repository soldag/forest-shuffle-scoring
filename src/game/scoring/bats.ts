import { getDwellersOfForest } from "../helpers";
import { CardType, Forest } from "../types";

const minCount = 3;
const points = 5;

export const scoreBats = (forest: Forest): number => {
  const batNames = new Set(
    getDwellersOfForest(forest)
      .filter((c) => c.types.includes(CardType.Bat))
      .map((c) => c.name),
  );

  return batNames.size >= minCount ? points : 0;
};
