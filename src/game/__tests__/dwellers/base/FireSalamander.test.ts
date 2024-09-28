import { describe, expect, it } from "@jest/globals";

import { FireSalamander } from "@/game/dwellers";

import {
  createAllDwellers,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Fire Salamander card", () => {
  it.each([
    [5, 1],
    [15, 2],
    [25, 3],
  ])(
    "scores %i points if there are %i Fire Salamander cards",
    (expectedPoints, count) => {
      const allDwellers = createAllDwellers(FireSalamander);
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: allDwellers[0],
        otherDwellers: allDwellers.slice(1, count),
      });
      const game = createGame(forest);

      const points = FireSalamander.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("scores 0 points if there's another Fire Salamander card with a smaller id", () => {
    const [dwellerUnderTest, ...otherDwellers] =
      createAllDwellers(FireSalamander).reverse();
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest,
      otherDwellers,
    });
    const game = createGame(forest);

    const points = FireSalamander.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });
});
