import { describe, expect, it } from "@jest/globals";

import { SqueakerWoodlandEdge } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Squeaker (Woodland Edge) card", () => {
  it("scores 1 point in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(SqueakerWoodlandEdge),
    });
    const game = createGame(forest);

    const points = SqueakerWoodlandEdge.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(1);
  });

  it("scores 1 point in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(SqueakerWoodlandEdge),
    });
    const game = createGame(forest);

    const points = SqueakerWoodlandEdge.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(1);
  });
});
