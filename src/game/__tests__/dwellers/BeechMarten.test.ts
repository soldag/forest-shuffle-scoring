import { describe, expect, it } from "@jest/globals";

import { BeechMarten } from "@/game/dwellers";
import { createDweller } from "@/game/factory";
import { DwellerPosition } from "@/game/types";

import { createFakeDwellers, createFakeWoodyPlant } from "../fake";
import {
  addDwellersToWoodyPlant,
  createForestWith,
  createGame,
} from "../helpers";

describe("A Beech Marten card", () => {
  it.each([
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [5, 1, 1, 1],
    [5, 2, 2, 2],
  ])(
    "scores %i points with %i dwellers on top, %i on the bottom, %i on the left and 1 on the right",
    (expectedPoints, top, bottom, left) => {
      const variant = BeechMarten.variants.find(
        (v) => v.position === DwellerPosition.Right,
      )!;
      const dweller = createDweller(BeechMarten, variant);
      const woodyPlant = addDwellersToWoodyPlant(
        createFakeWoodyPlant(),
        ...createFakeDwellers(top, DwellerPosition.Top),
        ...createFakeDwellers(bottom, DwellerPosition.Bottom),
        ...createFakeDwellers(left, DwellerPosition.Left),
        dweller,
      );
      const forest = createForestWith({ woodyPlants: [woodyPlant] });
      const game = createGame(forest);

      const points = BeechMarten.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
