import { describe, expect, it } from "@jest/globals";

import { DwellerPosition, TreeSymbol } from "@/game";
import { Chamois } from "@/game/dwellers";
import { createDweller, createTree } from "@/game/factory";
import { Sapling } from "@/game/trees";

import { createFakeDwellers, createFakeTree } from "../../fake";
import {
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Chamois card", () => {
  it.each([
    [TreeSymbol.AlpineLarch],
    [TreeSymbol.DouglasFir],
    [TreeSymbol.SwissPine],
  ])(
    "with %s symbol scores 3 points if there's no other cards with that symbol",
    (treeSymbol) => {
      const { dweller, tree, forest } = createCompleteForestWithDweller({
        dwellerUnderTest: createDweller(
          Chamois,
          Chamois.variants.find((v) => v.treeSymbol === treeSymbol)!,
        ),
        filterDwellers: (d) => d.treeSymbol !== treeSymbol,
        filterTrees: (t) => t.treeSymbol !== treeSymbol,
      });
      const game = createGame(forest);

      const points = Chamois.score({ game, forest, tree, dweller });

      expect(points).toBe(3);
    },
  );

  it.each([
    [TreeSymbol.AlpineLarch, 9],
    [TreeSymbol.DouglasFir, 12],
    [TreeSymbol.SwissPine, 15],
  ])("with %s symbol scores %i points", (treeSymbol, expectedPoints) => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createDweller(
        Chamois,
        Chamois.variants.find((v) => v.treeSymbol === treeSymbol)!,
      ),
      otherDwellers: [
        ...createFakeDwellers(1, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.AlpineLarch,
        }),
        ...createFakeDwellers(2, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.DouglasFir,
        }),
        ...createFakeDwellers(3, DwellerPosition.Left, {
          treeSymbol: TreeSymbol.SwissPine,
        }),
      ],
      otherTrees: [
        createTree(Sapling),
        createFakeTree({ treeSymbol: TreeSymbol.AlpineLarch }),
        createFakeTree({ treeSymbol: TreeSymbol.DouglasFir }),
        createFakeTree({ treeSymbol: TreeSymbol.SwissPine }),
      ],
    });
    const game = createGame(forest);

    const points = Chamois.score({ game, forest, tree, dweller });

    expect(points).toBe(expectedPoints);
  });
});
