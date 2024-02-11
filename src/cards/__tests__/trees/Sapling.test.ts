import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/cards/factory";
import { Sapling } from "@/cards/trees";

import { createForestWithTrees, createGame } from "../helpers";

describe("A Sapling card", () => {
  it("always scores 0 points", () => {
    const tree = createTree(Sapling);
    const forest = createForestWithTrees(tree);
    const game = createGame(forest);

    const points = Sapling.score({ game, forest, tree });

    expect(points).toBe(0);
  });
});
