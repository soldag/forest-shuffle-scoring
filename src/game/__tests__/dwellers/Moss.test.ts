import { describe, expect, it } from "@jest/globals";

import { Moss } from "@/game/dwellers";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { Sapling } from "@/game/trees";
import { DwellerPosition } from "@/game/types";

import { createFakeDweller, createFakeTrees } from "../fake";
import {
  createAnyDweller,
  createForestWithDweller,
  createGame,
  createTrees,
} from "../helpers";

describe("A Moss card", () => {
  it.each([
    [0, 1],
    [0, 9],
    [10, 10],
    [10, 20],
  ])(
    "scores %i points if forest has at least %i trees",
    (expectedPoints, count) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(Moss),
        otherTrees: createFakeTrees(count),
      });
      const game = createGame(forest);

      const points = Moss.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("takes into account Sapling cards when scoring", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(Moss),
      otherTrees: createTrees(Sapling, 10),
    });
    const game = createGame(forest);

    const points = Moss.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(Moss),
      otherDwellers: [
        createFakeDweller(DwellerPosition.Left, {
          modifiers: {
            ...DEFAULT_MODIFIERS,
            treeCount: 1,
          },
        }),
      ],
      otherTrees: createFakeTrees(9),
    });
    const game = createGame(forest);

    const points = Moss.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });
});
