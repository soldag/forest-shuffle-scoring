import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/cards";
import { DEFAULT_MODIFIERS } from "@/cards/dwellers/modifiers";
import { createTree } from "@/cards/factory";
import { HorseChestnut } from "@/cards/trees";

import { createFakeDweller } from "../fake";
import {
  addDwellersToTree,
  createForestWithTrees,
  createGame,
  createTrees,
} from "../helpers";

describe("A Horse Chestnut card", () => {
  it.each([
    [1, 1],
    [4, 2],
    [9, 3],
    [16, 4],
    [25, 5],
    [36, 6],
  ])("scores %i points for a set of %i", (expectedPoints, count) => {
    const trees = createTrees(HorseChestnut, count);
    const forest = createForestWithTrees(...trees);
    const game = createGame(forest);

    const points = trees
      .map((tree) => HorseChestnut.score({ game, forest, tree }))
      .reduce((a, b) => a + b, 0);

    expect(points).toBe(expectedPoints);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const tree = addDwellersToTree(
      createTree(HorseChestnut),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          ...DEFAULT_MODIFIERS,
          treeCount: 1,
        },
      }),
    );
    const forest = createForestWithTrees(tree);
    const game = createGame(forest);

    const points = HorseChestnut.score({ game, forest, tree });

    expect(points).toBe(4);
  });
});
