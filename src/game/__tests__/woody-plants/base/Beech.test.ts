import { describe, expect, it } from "@jest/globals";

import { DwellerPosition, TreeSymbol } from "@/game";
import { Beech } from "@/game/woody-plants";

import { createFakeDweller, createFakeWoodyPlant } from "../../fake";
import {
  addDwellersToWoodyPlant,
  createAnyWoodyPlant,
  createForestWith,
  createGame,
  createWoodyPlants,
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
      const woodyPlants = createWoodyPlants(Beech, count);
      const forest = createForestWith({ woodyPlants });
      const game = createGame(forest);

      const points = Beech.score({ game, forest, woodyPlant: woodyPlants[0]! });

      expect(points).toBe(expectedPoints);
    },
  );

  it("ignores other tree types when scoring", () => {
    const woodyPlants = [
      ...createWoodyPlants(Beech, 3),
      createFakeWoodyPlant({ treeSymbol: TreeSymbol.Oak }),
    ];
    const forest = createForestWith({ woodyPlants });
    const game = createGame(forest);

    const points = Beech.score({ game, forest, woodyPlant: woodyPlants[0]! });

    expect(points).toBe(0);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const woodyPlants = [
      ...createWoodyPlants(Beech, 3),
      addDwellersToWoodyPlant(
        createAnyWoodyPlant(Beech),
        createFakeDweller(DwellerPosition.Left, {
          modifiers: {
            woodyPlantCount: () => 1,
          },
        }),
      ),
    ];
    const forest = createForestWith({ woodyPlants });
    const game = createGame(forest);

    const points = Beech.score({
      game,
      forest,
      woodyPlant: woodyPlants[0]!,
    });

    expect(points).toBe(5);
  });
});
