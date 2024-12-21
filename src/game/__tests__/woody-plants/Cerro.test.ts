import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game/types";
import { Cerro } from "@/game/woody-plants";

import { createFakeDwellers } from "../fake";
import {
  createAnyWoodyPlant,
  createForestForWoodyPlantTest,
  createGame,
} from "../helpers";

describe("A Cerro card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [5, 5],
  ])(
    "scores %i points for %i cloven-hoofed cards",
    (expectedPoints, plantCount) => {
      const { woodyPlant, forest } = createForestForWoodyPlantTest({
        woodyPlantUnderTest: createAnyWoodyPlant(Cerro),
        dwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
          types: [CardType.ClovenhoofedAnimal],
        }),
      });
      const game = createGame(forest);

      const points = Cerro.score({
        game,
        forest,
        woodyPlant,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
