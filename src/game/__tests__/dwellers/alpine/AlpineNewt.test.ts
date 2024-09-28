import { describe, expect, it } from "@jest/globals";

import { AlpineNewt } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("An Alpine Newt card", () => {
  it.each([
    [0, 0],
    [2, 1],
    [4, 2],
    [10, 5],
  ])("scores %i points for %i insect cards", (expectedPoints, plantCount) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(AlpineNewt),
      otherDwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
        types: [CardType.Insect],
      }),
    });
    const game = createGame(forest);

    const points = AlpineNewt.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
