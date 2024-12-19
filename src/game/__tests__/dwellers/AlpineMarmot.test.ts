import { describe, expect, it } from "@jest/globals";

import { AlpineMarmot } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("An Alpine Marmot card", () => {
  it.each([
    [0, 0],
    [3, 1],
    [6, 2],
    [15, 5],
  ])(
    "scores %i points for %i unique plant cards",
    (expectedPoints, plantCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(AlpineMarmot),
        otherDwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
          types: [CardType.Plant],
          uniqueName: true,
        }),
      });
      const game = createGame(forest);

      const points = AlpineMarmot.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("ignores duplicate plants when scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(AlpineMarmot),
      otherDwellers: createFakeDwellers(10, DwellerPosition.Bottom, {
        types: [CardType.Plant],
        uniqueName: false,
      }),
    });
    const game = createGame(forest);

    const points = AlpineMarmot.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(3);
  });
});
