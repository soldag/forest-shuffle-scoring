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

describe("A Barbastelle Bat card", () => {
  it.each([
    [0, 0, []],
    [0, 1, [BechsteinsBat]],
    [5, 2, [BechsteinsBat, BrownLongEaredBat]],
    [5, 3, [BechsteinsBat, BrownLongEaredBat]],
    [5, 3, [BechsteinsBat, BrownLongEaredBat, GreaterHorseshoeBat]],
  ])(
    "scores %i points if there %i other bat species",
    (expectedPoints, _, otherBatBlueprints) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(BarbastelleBat),
        otherDwellers: otherBatBlueprints.map(createAnyDweller),
      });
      const game = createGame(forest);

      const points = BarbastelleBat.score({
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
      dwellerUnderTest: createAnyDweller(BarbastelleBat),
      otherDwellers: createAllDwellers(BechsteinsBat),
    });
    const game = createGame(forest);

    const points = BarbastelleBat.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
