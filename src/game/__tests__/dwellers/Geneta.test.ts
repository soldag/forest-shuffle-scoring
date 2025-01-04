import { describe, expect, it } from "@jest/globals";

import { Geneta } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Geneta card", () => {
  it("scores 5 points in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Geneta),
    });
    const game = createGame(forest);

    const points = Geneta.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores 5 points in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(Geneta),
    });
    const game = createGame(forest);

    const points = Geneta.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });
});
