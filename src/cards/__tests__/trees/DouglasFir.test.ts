import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/cards/factory";
import { DouglasFir } from "@/cards/trees";

import { createForestWithTrees, createGame } from "../helpers";

describe("A Douglas Fir card", () => {
  it("always scores 5 points", () => {
    const tree = createTree(DouglasFir);
    const forest = createForestWithTrees(tree);
    const game = createGame(forest);

    const points = DouglasFir.score({ game, forest, tree });

    expect(points).toBe(5);
  });
});
