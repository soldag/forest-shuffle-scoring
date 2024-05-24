import { describe, expect, it } from "@jest/globals";

import { Blueberry } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Blueberry card", () => {
  it.each([
    [0, 0],
    [2, 1],
    [4, 2],
    [10, 5],
  ])(
    "scores %i points for %i unique bird cards",
    (expectedPoints, birdCount) => {
      const { dweller, tree, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Blueberry),
        otherDwellers: createFakeDwellers(birdCount, DwellerPosition.Bottom, {
          types: [CardType.Bird],
          uniqueName: true,
        }),
      });
      const game = createGame(forest);

      const points = Blueberry.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("ignores duplicate birds when scoring", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Blueberry),
      otherDwellers: createFakeDwellers(10, DwellerPosition.Bottom, {
        types: [CardType.Bird],
        uniqueName: false,
      }),
    });
    const game = createGame(forest);

    const points = Blueberry.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(2);
  });
});
