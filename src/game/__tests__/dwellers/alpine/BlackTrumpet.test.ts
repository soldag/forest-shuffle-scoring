import { describe, expect, it } from "@jest/globals";

import { BlackTrumpet } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Black Trumpet card", () => {
  it("scores no points in an empty forest", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(BlackTrumpet),
    });
    const game = createGame(forest);

    const points = BlackTrumpet.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(BlackTrumpet),
    });
    const game = createGame(forest);

    const points = BlackTrumpet.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
