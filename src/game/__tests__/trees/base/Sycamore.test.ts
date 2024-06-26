import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/game";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { createTree } from "@/game/factory";
import { Sapling, Sycamore } from "@/game/trees";

import { createFakeDweller, createFakeTrees } from "../../fake";
import { addDwellersToTree, createForestWith, createGame } from "../../helpers";

describe("A Sycamore card", () => {
  it("scores 1 point if there are no other trees", () => {
    const tree = createTree(Sycamore);
    const forest = createForestWith({ trees: [tree] });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(1);
  });

  it("scores 3 points if there are 3 trees", () => {
    const tree = createTree(Sycamore);
    const otherTrees = createFakeTrees(2);
    const forest = createForestWith({ trees: [tree, ...otherTrees] });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(3);
  });

  it("scores for Saplings", () => {
    const tree = createTree(Sycamore);
    const otherTree = createTree(Sapling);
    const forest = createForestWith({ trees: [tree, otherTree] });
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
    const forest = createForestWith({ trees: [tree] });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, tree });

    expect(points).toBe(1);
  });
});
