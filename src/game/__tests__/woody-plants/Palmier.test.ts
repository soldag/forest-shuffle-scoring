import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game/types";
import { Palmier } from "@/game/woody-plants";

import { createFakeDwellers } from "../fake";
import {
  createAnyWoodyPlant,
  createForestForWoodyPlantTest,
  createGame,
} from "../helpers";

describe("A Palmier card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [5, 5],
  ])("scores %i points if there %i bird cards", (expectedPoints, birdCount) => {
    const { woodyPlant, forest } = createForestForWoodyPlantTest({
      woodyPlantUnderTest: createAnyWoodyPlant(Palmier),
      dwellers: createFakeDwellers(birdCount, DwellerPosition.Top, {
        types: [CardType.Bird],
      }),
    });
    const game = createGame(forest);

    const points = Palmier.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(expectedPoints);
  });
});
