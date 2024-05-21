import { describe, expect, it } from "@jest/globals";

import {
  BarbastelleBat,
  BechsteinsBat,
  BrownLongEaredBat,
  GreaterHorseshoeBat,
} from "@/game/dwellers";

import {
  createAllDwellers,
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../../helpers";

describe("A Greater Horseshoe Bat card", () => {
  it.each([
    [0, 0, []],
    [0, 1, [BarbastelleBat]],
    [5, 2, [BarbastelleBat, BechsteinsBat]],
    [5, 3, [BarbastelleBat, BechsteinsBat, BrownLongEaredBat]],
  ])(
    "scores %i points if there %i other bat species",
    (expectedPoints, _, otherBatBlueprints) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(GreaterHorseshoeBat),
        otherDwellers: otherBatBlueprints.map(createAnyDweller),
      });
      const game = createGame(forest);

      const points = GreaterHorseshoeBat.score({
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
      dwellerUnderTest: createAnyDweller(GreaterHorseshoeBat),
      otherDwellers: createAllDwellers(BarbastelleBat),
    });
    const game = createGame(forest);

    const points = GreaterHorseshoeBat.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
