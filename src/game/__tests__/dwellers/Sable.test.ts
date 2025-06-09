import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game";
import { Sable } from "@/game/dwellers";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Sable card", () => {
  it.each([
    [3, 0],
    [6, 1],
    [18, 5],
  ])(
    "scores %i points if there are %i other pawed animal cards",
    (expectedPoints, count) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Sable),
        otherDwellers: createFakeDwellers(count, DwellerPosition.Left, {
          types: [CardType.PawedAnimal],
        }),
      });
      const game = createGame(forest);

      const points = Sable.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
