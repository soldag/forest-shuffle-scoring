import { describe, expect, it } from "@jest/globals";

import { FallowDeer } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Fallow Deer card", () => {
  it.each([
    [3, 0],
    [6, 1],
    [15, 4],
  ])(
    "scores %i points if there are %i other cloven-hoofed animal cards",
    (expectedPoints, count) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(FallowDeer),
        otherDwellers: createFakeDwellers(count, DwellerPosition.Left, {
          types: [CardType.ClovenhoofedAnimal],
        }),
      });
      const game = createGame(forest);

      const points = FallowDeer.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
