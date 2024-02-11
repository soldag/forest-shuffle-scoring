import { describe, expect, it } from "@jest/globals";

import { EuropeanBadger } from "@/cards/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A European Badger card", () => {
  it("scores 2 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestWithDweller({
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
