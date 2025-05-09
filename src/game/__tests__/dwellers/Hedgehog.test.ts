import { describe, expect, it } from "@jest/globals";

import { Hedgehog } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Hedgehog card", () => {
  it.each([
    [0, 0],
    [2, 1],
    [8, 4],
  ])(
    "scores %i points if there are %i butterfly cards",
    (expectedPoints, count) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Hedgehog),
        otherDwellers: createFakeDwellers(count, DwellerPosition.Top, {
          types: [CardType.Butterfly],
        }),
      });
      const game = createGame(forest);

      const points = Hedgehog.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
