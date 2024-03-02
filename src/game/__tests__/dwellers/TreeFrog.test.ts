import { describe, expect, it } from "@jest/globals";

import { Gnat, TreeFrog } from "@/game/dwellers";

import {
  createAllDwellers,
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Tree Frog card", () => {
  it.each([
    [0, 0],
    [5, 1],
    [15, 3],
  ])("scores %i points if there are %i Gnat cards", (expectedPoints, count) => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(TreeFrog),
      otherDwellers: createAllDwellers(Gnat).slice(0, count),
    });
    const game = createGame(forest);

    const points = TreeFrog.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
