import { describe, expect, it } from "@jest/globals";

import { DwellerPosition, TreeSymbol } from "@/game";
import { Chamois } from "@/game/dwellers";
import { createDweller, createSapling } from "@/game/factory";

import { createFakeDwellers, createFakeWoodyPlant } from "../../fake";
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
      const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
        dwellerUnderTest: createDweller(
          Chamois,
          Chamois.variants.find((v) => v.treeSymbol === treeSymbol)!,
        ),
        filterDwellers: (d) => d.treeSymbol !== treeSymbol,
        filterWoodyPlants: (w) => w.treeSymbol !== treeSymbol,
      });
      const game = createGame(forest);

      const points = Chamois.score({ game, forest, woodyPlant, dweller });

      expect(points).toBe(3);
    },
  );

  it.each([
    [TreeSymbol.AlpineLarch, 9],
    [TreeSymbol.DouglasFir, 12],
    [TreeSymbol.SwissPine, 15],
  ])("with %s symbol scores %i points", (treeSymbol, expectedPoints) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
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
      otherWoodyPlants: [
        createSapling(),
        createFakeWoodyPlant({ treeSymbol: TreeSymbol.AlpineLarch }),
        createFakeWoodyPlant({ treeSymbol: TreeSymbol.DouglasFir }),
        createFakeWoodyPlant({ treeSymbol: TreeSymbol.SwissPine }),
      ],
    });
    const game = createGame(forest);

    const points = Chamois.score({ game, forest, woodyPlant, dweller });

    expect(points).toBe(expectedPoints);
  });
});
