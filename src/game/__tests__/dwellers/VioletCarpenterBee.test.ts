import { describe, expect, it } from "@jest/globals";

import { VioletCarpenterBee } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Violet Carpenter Bee card", () => {
  it("scores 0 points in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(VioletCarpenterBee),
    });
    const game = createGame(forest);

    const points = VioletCarpenterBee.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("scores 0 points in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(VioletCarpenterBee),
    });
    const game = createGame(forest);

    const points = VioletCarpenterBee.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });
});
