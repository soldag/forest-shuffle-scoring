import { describe, expect, it } from "@jest/globals";

import { Lynx, RoeDeer } from "@/game/dwellers";

import {
  createAllDwellers,
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Lynx card", () => {
  it.each([
    [0, 0],
    [10, 1],
    [10, 2],
  ])(
    "scores %i points if there are %i Roe Deer cards",
    (expectedPoints, count) => {
      const { dweller, tree, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Lynx),
        otherDwellers: createAllDwellers(RoeDeer).slice(0, count),
      });
      const game = createGame(forest);

      const points = Lynx.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
