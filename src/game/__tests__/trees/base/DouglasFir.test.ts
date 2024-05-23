import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/game/factory";
import { DouglasFir } from "@/game/trees";

import { createForestWith, createGame } from "../../helpers";

describe("A Douglas Fir card", () => {
  it("always scores 5 points", () => {
    const tree = createTree(DouglasFir);
    const forest = createForestWith({ trees: [tree] });
    const game = createGame(forest);

    const points = DouglasFir.score({ game, forest, tree });

    expect(points).toBe(5);
  });
});
