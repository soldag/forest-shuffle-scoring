import { describe, expect, it } from "@jest/globals";

import { Wolf } from "@/game/dwellers";

import { CardType, DwellerPosition } from "../..";
import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Wolf card", () => {
  it.each([
    [0, 0],
    [5, 1],
    [25, 5],
  ])("scores %i points if there are %i deer cards", (expectedPoints, count) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Wolf),
      otherDwellers: createFakeDwellers(count, DwellerPosition.Left, {
        types: [CardType.Deer],
      }),
    });
    const game = createGame(forest);

    const points = Wolf.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
