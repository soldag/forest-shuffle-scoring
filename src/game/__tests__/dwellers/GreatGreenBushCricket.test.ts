import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game";
import { GreatGreenBushCricket } from "@/game/dwellers";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Great Green Bush-Cricket card", () => {
  it.each([
    [1, 0],
    [2, 1],
    [3, 2],
    [6, 5],
  ])(
    "scores %i points for %i other insect cards",
    (expectedPoints, insectCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(GreatGreenBushCricket),
        otherDwellers: createFakeDwellers(insectCount, DwellerPosition.Bottom, {
          types: [CardType.Insect],
        }),
      });
      const game = createGame(forest);

      const points = GreatGreenBushCricket.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
