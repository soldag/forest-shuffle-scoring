import { describe, expect, it } from "@jest/globals";

import { DwellerCard, TreeSymbol, WoodyPlantCard } from "@/game";
import { Elk } from "@/game/dwellers";
import { Sapling } from "@/game/woody-plants";

import { createFakeWoodyPlants } from "../fake";
import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
  createWoodyPlants,
} from "../helpers";

describe("An Elk card", () => {
  it("scores 2 points if there are no Saplings or other cards with Birch or Douglas Fir symbol", () => {
    const affectedTreeSymbols = [TreeSymbol.Birch, TreeSymbol.DouglasFir];
    const cardFilter = (c: WoodyPlantCard | DwellerCard) =>
      c.name !== Sapling.name &&
      (!c.treeSymbol || !affectedTreeSymbols.includes(c.treeSymbol));

    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(Elk),
      filterDwellers: cardFilter,
      filterWoodyPlants: cardFilter,
    });
    const game = createGame(forest);

    const points = Elk.score({ game, forest, woodyPlant, dweller });

    expect(points).toBe(2);
  });

  it.each([
    [2, 0, 0, 0],
    [4, 1, 0, 0],
    [4, 0, 1, 0],
    [4, 0, 0, 1],
    [14, 2, 2, 2],
  ])(
    "scores $s points with %s Saplings, %s cards with Birch symbol and %s other cards with DouglasFir symbol",
    (expectedPoints, saplingCount, birchCount, douglasFirCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Elk),
        otherWoodyPlants: [
          ...createWoodyPlants(Sapling, saplingCount),
          ...createFakeWoodyPlants(birchCount, {
            treeSymbol: TreeSymbol.Birch,
          }),
          ...createFakeWoodyPlants(douglasFirCount, {
            treeSymbol: TreeSymbol.DouglasFir,
          }),
        ],
      });
      const game = createGame(forest);

      const points = Elk.score({ game, forest, woodyPlant, dweller });

      expect(points).toBe(expectedPoints);
    },
  );
});
