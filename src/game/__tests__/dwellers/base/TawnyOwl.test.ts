import { describe, expect, it } from "@jest/globals";

import { TawnyOwl } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Tawny Owl card", () => {
  it("scores 5 points in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(TawnyOwl),
    });
    const game = createGame(forest);

    const points = TawnyOwl.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores 5 points in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(TawnyOwl),
    });
    const game = createGame(forest);

    const points = TawnyOwl.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });
});
