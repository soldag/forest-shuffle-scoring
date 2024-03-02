import { describe, expect, it } from "@jest/globals";

import { Fireflies } from "@/game/dwellers";

import {
  createAllDwellers,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Fireflies card", () => {
  it.each([
    [0, 1],
    [10, 2],
    [15, 3],
    [20, 4],
  ])(
    "scores %i points if there are %i Fireflies cards",
    (expectedPoints, count) => {
      const allDwellers = createAllDwellers(Fireflies);
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: allDwellers[0],
        otherDwellers: allDwellers.slice(1, count),
      });
      const game = createGame(forest);

      const points = Fireflies.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("scores 0 points if there's another Fireflies card with a smaller id", () => {
    const [dwellerUnderTest, ...otherDwellers] =
      createAllDwellers(Fireflies).reverse();
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest,
      otherDwellers,
    });
    const game = createGame(forest);

    const points = Fireflies.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
