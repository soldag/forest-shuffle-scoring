import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/game";
import { HorseChestnut } from "@/game/woody-plants";

import { createFakeDweller } from "../../fake";
import {
  addDwellersToWoodyPlant,
  createAnyWoodyPlant,
  createForestWith,
  createGame,
  createWoodyPlants,
} from "../../helpers";

describe("A Horse Chestnut card", () => {
  it.each([
    [1, 1],
    [4, 2],
    [9, 3],
    [16, 4],
    [25, 5],
    [36, 6],
    [49, 7],
    [49, 8],
  ])("scores %i points for a set of %i", (expectedPoints, count) => {
    const woodyPlants = createWoodyPlants(HorseChestnut, count);
    const forest = createForestWith({ woodyPlants });
    const game = createGame(forest);

    const points = woodyPlants
      .map((woodyPlant) => HorseChestnut.score({ game, forest, woodyPlant }))
      .reduce((a, b) => a + b, 0);

    expect(points).toBe(expectedPoints);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const woodyPlant = addDwellersToWoodyPlant(
      createAnyWoodyPlant(HorseChestnut),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          woodyPlantCount: () => 1,
        },
      }),
    );
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = HorseChestnut.score({ game, forest, woodyPlant });

    expect(points).toBe(4);
  });
});
