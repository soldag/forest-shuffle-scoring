import { describe, expect, it } from "@jest/globals";

import { EuropeanHare } from "@/game/dwellers";

import {
  createAllDwellers,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A European Hare card", () => {
  it.each(
    Array.from(Array(EuropeanHare.variants.length).keys())
      .map((i) => i + 1)
      .map((n) => [n, n]),
  )(
    "scores %i points if there are %i European Hare cards",
    (expectedPoints, count) => {
      const allDwellers = createAllDwellers(EuropeanHare);
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: allDwellers[0],
        otherDwellers: allDwellers.slice(1, count),
      });
      const game = createGame(forest);

      const points = EuropeanHare.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
