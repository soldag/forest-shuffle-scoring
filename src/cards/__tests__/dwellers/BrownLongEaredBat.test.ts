import { describe, expect, it } from "@jest/globals";

import {
  BarbastelleBat,
  BechsteinsBat,
  BrownLongEaredBat,
  GreaterHorseshoeBat,
} from "@/cards/dwellers";

import {
  createAllDwellers,
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Brown Long-Eared Bat card", () => {
  it.each([
    [0, 0, []],
    [0, 1, [BarbastelleBat]],
    [5, 2, [BarbastelleBat, BechsteinsBat]],
    [5, 3, [BarbastelleBat, BechsteinsBat, GreaterHorseshoeBat]],
  ])(
    "scores %i points if there %i other bat species",
    (expectedPoints, _, otherBatBlueprints) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(BrownLongEaredBat),
        otherDwellers: otherBatBlueprints.map(createAnyDweller),
      });
      const game = createGame(forest);

      const points = BrownLongEaredBat.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("ignores multiple instances of the same bat", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(BrownLongEaredBat),
      otherDwellers: createAllDwellers(BarbastelleBat),
    });
    const game = createGame(forest);

    const points = BrownLongEaredBat.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
