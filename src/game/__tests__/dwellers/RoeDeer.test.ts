import { describe, expect, it } from "@jest/globals";

import { DwellerPosition, TreeSymbol } from "@/game";
import { RoeDeer } from "@/game/dwellers";
import { createDweller, createTree } from "@/game/factory";
import { Sapling } from "@/game/trees";

import { createFakeDwellers, createFakeTree } from "../fake";
import {
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Roe Deer card", () => {
  it.each([
    [TreeSymbol.Linden],
    [TreeSymbol.SilverFir],
    [TreeSymbol.Beech],
    [TreeSymbol.Birch],
    [TreeSymbol.HorseChestnut],
  ])(
    "with %s symbol scores 3 points if there's no other cards with that symbol",
    (treeSymbol) => {
      const { dweller, tree, forest } = createCompleteForestWithDweller({
        dwellerUnderTest: createDweller(
          RoeDeer,
          RoeDeer.variants.find((v) => v.treeSymbol === treeSymbol)!,
        ),
        filterDwellers: (d) => d.treeSymbol !== treeSymbol,
        filterTrees: (t) => t.treeSymbol !== treeSymbol,
      });
      const game = createGame(forest);

      const points = RoeDeer.score({ game, forest, tree, dweller });

      expect(points).toBe(3);
    },
  );

  it.each([
    [TreeSymbol.Linden, 9],
    [TreeSymbol.SilverFir, 12],
    [TreeSymbol.Beech, 15],
    [TreeSymbol.Birch, 18],
    [TreeSymbol.HorseChestnut, 21],
  ])("with %s symbol scores %i points", (treeSymbol, expectedPoints) => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createDweller(
        RoeDeer,
        RoeDeer.variants.find((v) => v.treeSymbol === treeSymbol)!,
      ),
      otherDwellers: [
        ...createFakeDwellers(1, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.Linden,
        }),
        ...createFakeDwellers(2, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.SilverFir,
        }),
        ...createFakeDwellers(3, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.Beech,
        }),
        ...createFakeDwellers(4, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.Birch,
        }),
        ...createFakeDwellers(5, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.HorseChestnut,
        }),
      ],
      otherTrees: [
        createTree(Sapling),
        createFakeTree({ treeSymbol: TreeSymbol.Linden }),
        createFakeTree({ treeSymbol: TreeSymbol.SilverFir }),
        createFakeTree({ treeSymbol: TreeSymbol.Beech }),
        createFakeTree({ treeSymbol: TreeSymbol.Birch }),
        createFakeTree({ treeSymbol: TreeSymbol.HorseChestnut }),
      ],
    });
    const game = createGame(forest);

    const points = RoeDeer.score({ game, forest, tree, dweller });

    expect(points).toBe(expectedPoints);
  });
});
