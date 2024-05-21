import { describe, expect, it } from "@jest/globals";

import { Blackberries } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../../fake";
import {
  createAllDwellers,
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../../helpers";

describe("A Blackberries card", () => {
  it.each([
    [2, 0],
    [4, 1],
    [10, 4],
  ])(
    "scores %i points with %i other plant cards",
    (expectedPoints, otherPlantCount) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(Blackberries),
        otherDwellers: [
          ...createFakeDwellers(otherPlantCount, DwellerPosition.Bottom, {
            types: [CardType.Plant],
          }),
          ...createFakeDwellers(5, DwellerPosition.Top),
        ],
      });
      const game = createGame(forest);

      const points = Blackberries.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("also scores for other Blackberries", () => {
    const allDwellers = createAllDwellers(Blackberries);
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: allDwellers[0],
      otherDwellers: allDwellers.slice(1, 3),
    });
    const game = createGame(forest);

    const points = Blackberries.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(6);
  });
});
