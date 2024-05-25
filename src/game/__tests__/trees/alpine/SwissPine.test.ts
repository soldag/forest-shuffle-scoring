import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/game/factory";
import { SwissPine } from "@/game/trees";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers, createFakeTrees } from "../../fake";
import { createForestForTreeTest, createGame } from "../../helpers";

describe("A Swiss Pine card", () => {
  it.each([
    [1, 0, 0],
    [2, 0, 1],
    [2, 1, 0],
    [10, 4, 5],
  ])(
    "scores %i points if there are %i other alp tree cards and %i alp dweller cards",
    (expectedPoints, treeCount, dwellerCount) => {
      const otherTrees = createFakeTrees(treeCount, {
        types: [CardType.Alps, CardType.Tree],
      });
      const dwellers = createFakeDwellers(dwellerCount, DwellerPosition.Left, {
        types: [CardType.Alps],
      });
      const { tree, forest } = createForestForTreeTest({
        treeUnderTest: createTree(SwissPine),
        otherTrees,
        dwellers,
      });
      const game = createGame(forest);

      const points = SwissPine.score({
        game,
        forest,
        tree,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
