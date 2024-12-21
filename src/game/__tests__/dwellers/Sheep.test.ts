import { describe, expect, it } from "@jest/globals";

import { Sheep } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Sheep card", () => {
  it.each([
    [3, 0],
    [6, 1],
    [30, 9],
  ])(
    "scores %i points for %i cloven-hoofed cards",
    (expectedPoints, plantCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Sheep),
        otherDwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
          types: [CardType.ClovenhoofedAnimal],
        }),
      });
      const game = createGame(forest);

      const points = Sheep.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
