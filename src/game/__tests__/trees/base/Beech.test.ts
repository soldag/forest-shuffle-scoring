import { describe, expect, it } from "@jest/globals";

import { DwellerPosition, TreeSymbol } from "@/game";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { createTree } from "@/game/factory";
import { Beech } from "@/game/trees";

import { createFakeDweller, createFakeTree } from "../../fake";
import {
  addDwellersToTree,
  createForestWith,
  createGame,
  createTrees,
} from "../../helpers";

describe("A Beech card", () => {
  it.each([
    [0, 1],
    [0, 2],
    [0, 3],
    [5, 4],
    [5, 5],
  ])(
    "scores %i points if there are %i Beech cards",
    (expectedPoints, count) => {
      const trees = createTrees(Beech, count);
      const forest = createForestWith({ trees });
      const game = createGame(forest);

      const points = Beech.score({ game, forest, tree: trees[0]! });

      expect(points).toBe(expectedPoints);
    },
  );

  it("ignores other tree types when scoring", () => {
    const trees = [
      ...createTrees(Beech, 3),
      createFakeTree({ treeSymbol: TreeSymbol.Oak }),
    ];
    const forest = createForestWith({ trees });
    const game = createGame(forest);

    const points = Beech.score({ game, forest, tree: trees[0]! });

    expect(points).toBe(0);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const trees = [
      ...createTrees(Beech, 3),
      addDwellersToTree(
        createTree(Beech),
        createFakeDweller(DwellerPosition.Left, {
          modifiers: {
            ...DEFAULT_MODIFIERS,
            treeCount: 1,
          },
        }),
      ),
    ];
    const forest = createForestWith({ trees });
    const game = createGame(forest);

    const points = Beech.score({
      game,
      forest,
      tree: trees[0]!,
    });

    expect(points).toBe(5);
  });
});
