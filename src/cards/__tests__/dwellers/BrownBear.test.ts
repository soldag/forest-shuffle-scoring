import { describe, expect, it } from "@jest/globals";

import { BrownBear } from "@/cards/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Brown Bear card", () => {
  it("scores no points in an empty forest", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(BrownBear),
    });
    const game = createGame(forest);

    const points = BrownBear.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(BrownBear),
    });
    const game = createGame(forest);

    const points = BrownBear.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
