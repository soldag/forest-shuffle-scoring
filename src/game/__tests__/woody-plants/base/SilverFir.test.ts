import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/game/types";
import { SilverFir } from "@/game/woody-plants";

import { createFakeDwellers } from "../../fake";
import {
  addDwellersToWoodyPlant,
  createAnyWoodyPlant,
  createForestWith,
  createGame,
} from "../../helpers";

describe("A Silver Fir card", () => {
  it.each([
    [0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0],
    [4, 1, 1, 0, 0],
    [6, 1, 1, 1, 0],
    [8, 1, 1, 1, 1],
    [12, 2, 1, 2, 1],
  ])(
    "scores %i points with %i dwellers on top, %i on the bottom, %i on the left and %i on the right",
    (expectedPoints, top, bottom, left, right) => {
      const woodyPlant = addDwellersToWoodyPlant(
        createAnyWoodyPlant(SilverFir),
        ...createFakeDwellers(top, DwellerPosition.Top),
        ...createFakeDwellers(bottom, DwellerPosition.Bottom),
        ...createFakeDwellers(left, DwellerPosition.Left),
        ...createFakeDwellers(right, DwellerPosition.Right),
      );
      const forest = createForestWith({ woodyPlants: [woodyPlant] });
      const game = createGame(forest);

      const points = SilverFir.score({ game, forest, woodyPlant });

      expect(points).toBe(expectedPoints);
    },
  );
});
