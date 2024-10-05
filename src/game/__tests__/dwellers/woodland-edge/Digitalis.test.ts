import { describe, expect, it } from "@jest/globals";

import { createFakeDwellers } from "@/game/__tests__/fake";
import { Digitalis } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Digitalis card", () => {
  it.each([
    [1, 1],
    [3, 2],
    [6, 3],
    [10, 4],
    [15, 5],
    [15, 6],
  ])(
    "scores %i points for %i distinct plant cards",
    (expectedPoints, plantCount) => {
      const otherPlantCount = plantCount - 1;
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Digitalis),
        otherDwellers: createFakeDwellers(
          otherPlantCount,
          DwellerPosition.Bottom,
          { types: [CardType.Plant] },
        ),
      });
      const game = createGame(forest);

      const points = Digitalis.score({
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
      dwellerUnderTest: createAnyDweller(Digitalis),
      otherDwellers: createFakeDwellers(10, DwellerPosition.Bottom, {
        types: [CardType.Plant],
        uniqueName: false,
      }),
    });
    const game = createGame(forest);

    const points = Digitalis.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(3);
  });
});
