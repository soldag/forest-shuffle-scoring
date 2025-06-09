import { describe, expect, it } from "@jest/globals";

import { RedPanda } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Red Panda card", () => {
  it("scores 2 points in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(RedPanda),
    });
    const game = createGame(forest);

    const points = RedPanda.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(2);
  });

  it("scores 2 points in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(RedPanda),
    });
    const game = createGame(forest);

    const points = RedPanda.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(2);
  });
});
