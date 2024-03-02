import { getDwellersOfForest } from "../helpers";
import { CardType, DwellerCard, Forest } from "../types";

const POINTS_BY_COUNT: { [count: number]: number } = {
  2: 3,
  3: 6,
  4: 12,
  5: 20,
};

export const scoreButterflies = (
  forest: Forest,
  dweller: DwellerCard,
): number => {
  const butterflies = getDwellersOfForest(forest).filter((d) =>
    d.types.includes(CardType.Butterfly),
  );

  // Butterflies are supposed to be scored once for all cards
  if (butterflies.some((d) => d.id < dweller.id)) {
    return 0;
  }

  const sets = butterflies.reduce((acc, curr) => {
    const key = curr.name;
    const index = acc.findIndex((s) => !s.includes(key));
    if (index === -1) {
      return [...acc, [key]];
    }

    return [
      ...acc.slice(0, index),
      [...acc[index]!, key],
      ...acc.slice(index + 1),
    ];
  }, [] as string[][]);

  return sets
    .map((s) => POINTS_BY_COUNT[s.length] ?? 0)
    .reduce((a, b) => a + b, 0);
};
