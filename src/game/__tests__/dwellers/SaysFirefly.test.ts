import { describe, expect, it } from "@jest/globals";

import { Fireflies, SaysFirefly } from "@/game/dwellers";

import {
  createAllDwellers,
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Say's Firefly card", () => {
  it.each([
    [0, 1, 0],
    [10, 2, 0],
    [15, 3, 0],
    [20, 4, 0],
    [10, 1, 1],
    [20, 4, 1],
  ])(
    "scores %i points if there are %i Fireflies and %i Say's Firefly cards",
    (expectedPoints, firefliesCount, saysFireflyCount) => {
      const allFireflies = createAllDwellers(Fireflies);
      const allSaysFireflies = createAllDwellers(SaysFirefly);
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: {
          ...allSaysFireflies[0],
          id: "00000000-0000-0000-0000-000000000000",
        },
        otherDwellers: [
          ...allFireflies.slice(1, firefliesCount),
          ...allSaysFireflies.slice(0, saysFireflyCount),
        ],
      });
      const game = createGame(forest);

      const points = SaysFirefly.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it.each([
    [Fireflies.name, Fireflies],
    [SaysFirefly.name, SaysFirefly],
  ])(
    "scores 0 points if there's another %s card with a smaller id",
    (_, otherBlueprint) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: {
          ...createAnyDweller(SaysFirefly),
          id: "ffffffff-fff-ffff-ffff-ffffffffffff",
        },
        otherDwellers: [createAnyDweller(otherBlueprint)],
      });
      const game = createGame(forest);

      const points = SaysFirefly.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(0);
    },
  );
});
