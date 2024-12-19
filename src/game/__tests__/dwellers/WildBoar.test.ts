import { describe, expect, it } from "@jest/globals";

import { Squeaker, WildBoar } from "@/game/dwellers";

import {
  createAllDwellers,
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Wild Boar card", () => {
  it.each([
    [0, 0],
    [10, 1],
    [10, 2],
  ])(
    "scores %i points if there are %i Squeaker cards",
    (expectedPoints, count) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(WildBoar),
        otherDwellers: createAllDwellers(Squeaker).slice(0, count),
      });
      const game = createGame(forest);

      const points = WildBoar.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
