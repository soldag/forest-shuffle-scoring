import { describe, expect, it } from "@jest/globals";

import { createFakeDwellers } from "@/game/__tests__/fake";
import { Mistletoe } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Mistletoe card", () => {
  it.each([
    [1, 0],
    [2, 1],
    [3, 2],
    [6, 5],
  ])(
    "scores %i points for %i other plant cards",
    (expectedPoints, plantCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Mistletoe),
        otherDwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
          types: [CardType.Plant],
        }),
      });
      const game = createGame(forest);

      const points = Mistletoe.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
