import { describe, expect, it } from "@jest/globals";

import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { createTree } from "@/game/factory";
import { Linden } from "@/game/trees";
import { DwellerPosition } from "@/game/types";

import { createFakeDweller } from "../../fake";
import {
  addDwellersToTree,
  createForestWithTrees,
  createGame,
  createTrees,
} from "../../helpers";

describe("A Linden card", () => {
  const trees = createTrees(Linden, 2);
  const forest = createForestWithTrees(...trees);

  it("scores 3 points if forest has the most Linden trees", () => {
    const otherForest = createForestWithTrees(createTree(Linden));
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, tree: trees[0]! });

    expect(points).toBe(3);
  });

  it("scores 3 points if forest is tied for the most Linden trees", () => {
    const otherForest = createForestWithTrees(...createTrees(Linden, 2));
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, tree: trees[0]! });

    expect(points).toBe(3);
  });

  it("scores 1 point if forest doesn't have the most Linden trees", () => {
    const otherForest = createForestWithTrees(...createTrees(Linden, 3));
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, tree: trees[0]! });

    expect(points).toBe(1);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const otherTree = addDwellersToTree(
      createTree(Linden),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          ...DEFAULT_MODIFIERS,
          treeCount: 2,
        },
      }),
    );
    const otherForest = createForestWithTrees(otherTree);
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, tree: trees[0]! });

    expect(points).toBe(1);
  });
});
