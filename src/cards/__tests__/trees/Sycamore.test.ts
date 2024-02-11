import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/cards";
import { DEFAULT_MODIFIERS } from "@/cards/dwellers/modifiers";
import { createTree } from "@/cards/factory";
import { Sapling, Sycamore } from "@/cards/trees";

import { createFakeDweller, createFakeTrees } from "../fake";
import {
  addDwellersToTree,
  createForestWithTrees,
  createGame,
} from "../helpers";

describe("A Sycamore card", () => {
  it("scores 1 point if there are no other trees", () => {
    const tree = createTree(Sycamore);
    const forest = createForestWithTrees(tree);
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(1);
  });

  it("scores 3 points if there are 3 trees", () => {
    const tree = createTree(Sycamore);
    const otherTrees = createFakeTrees(2);
    const forest = createForestWithTrees(tree, ...otherTrees);
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(3);
  });

  it("scores for Saplings", () => {
    const tree = createTree(Sycamore);
    const otherTree = createTree(Sapling);
    const forest = createForestWithTrees(tree, otherTree);
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(2);
  });

  it("ignores cards increasing the tree count when scoring", () => {
    const tree = addDwellersToTree(
      createTree(Sycamore),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          ...DEFAULT_MODIFIERS,
          treeCount: 1,
        },
      }),
    );
    const forest = createForestWithTrees(tree);
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(1);
  });
});
