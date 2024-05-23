import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/game/factory";
import { Sapling } from "@/game/trees";

import { createForestWith, createGame } from "../../helpers";

describe("A Sapling card", () => {
  it("always scores 0 points", () => {
    const tree = createTree(Sapling);
    const forest = createForestWith({ trees: [tree] });
    const game = createGame(forest);

    const points = Sapling.score({ game, forest, tree });

    expect(points).toBe(0);
  });
});
