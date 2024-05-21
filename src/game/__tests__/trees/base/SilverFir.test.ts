import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/game/factory";
import { SilverFir } from "@/game/trees";
import { DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../../fake";
import {
  addDwellersToTree,
  createForestWithTrees,
  createGame,
} from "../../helpers";

describe("A Silver Fir card", () => {
  it.each([
    [0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0],
    [4, 1, 1, 0, 0],
    [6, 1, 1, 1, 0],
    [8, 1, 1, 1, 1],
    [12, 2, 1, 2, 1],
  ])(
    "scores %i points with %i dwellers on top, %i on the bottom, %i on the left and %i on the right",
    (expectedPoints, top, bottom, left, right) => {
      const tree = addDwellersToTree(
        createTree(SilverFir),
        ...createFakeDwellers(top, DwellerPosition.Top),
        ...createFakeDwellers(bottom, DwellerPosition.Bottom),
        ...createFakeDwellers(left, DwellerPosition.Left),
        ...createFakeDwellers(right, DwellerPosition.Right),
      );
      const forest = createForestWithTrees(tree);
      const game = createGame(forest);

      const points = SilverFir.score({ game, forest, tree });

      expect(points).toBe(expectedPoints);
    },
  );
});
