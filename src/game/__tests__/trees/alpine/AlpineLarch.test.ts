import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/game/factory";
import { AlpineLarch } from "@/game/trees";

import { createForestWith, createGame } from "../../helpers";

describe("An Alpine Larch card", () => {
  it("always scores 3 points", () => {
    const tree = createTree(AlpineLarch);
    const forest = createForestWith({ trees: [tree] });
    const game = createGame(forest);

    const points = AlpineLarch.score({ game, forest, tree });

    expect(points).toBe(3);
  });
});
