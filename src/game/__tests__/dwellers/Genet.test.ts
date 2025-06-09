import { describe, expect, it } from "@jest/globals";

import { Genet } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Genet card", () => {
  it("scores 5 points in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Genet),
    });
    const game = createGame(forest);

    const points = Genet.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores 5 points in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(Genet),
    });
    const game = createGame(forest);

    const points = Genet.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });
});
