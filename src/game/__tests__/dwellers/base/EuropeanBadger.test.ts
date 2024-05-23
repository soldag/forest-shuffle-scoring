import { describe, expect, it } from "@jest/globals";

import { EuropeanBadger } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A European Badger card", () => {
  it("scores 2 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(EuropeanBadger),
    });
    const game = createGame(forest);

    const points = EuropeanBadger.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(2);
  });

  it("scores 2 points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(EuropeanBadger),
    });
    const game = createGame(forest);

    const points = EuropeanBadger.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(2);
  });
});
