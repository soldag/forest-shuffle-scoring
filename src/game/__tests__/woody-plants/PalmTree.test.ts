import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game/types";
import { PalmTree } from "@/game/woody-plants";

import { createFakeDwellers } from "../fake";
import {
  createAnyWoodyPlant,
  createForestForWoodyPlantTest,
  createGame,
} from "../helpers";

describe("A Palm Tree card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [5, 5],
  ])("scores %i points if there %i bird cards", (expectedPoints, birdCount) => {
    const { woodyPlant, forest } = createForestForWoodyPlantTest({
      woodyPlantUnderTest: createAnyWoodyPlant(PalmTree),
      dwellers: createFakeDwellers(birdCount, DwellerPosition.Top, {
        types: [CardType.Bird],
      }),
    });
    const game = createGame(forest);

    const points = PalmTree.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(expectedPoints);
  });
});
