import { describe, expect, it } from "@jest/globals";

import { Cuckoo } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Cuckoo card", () => {
  it("scores 7 points in an empty forest", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Cuckoo),
    });
    const game = createGame(forest);

    const points = Cuckoo.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(7);
  });

  it("scores 7 points in a complete forest", () => {
    const { dweller, woodyPlant, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(Cuckoo),
    });
    const game = createGame(forest);

    const points = Cuckoo.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(7);
  });
});
