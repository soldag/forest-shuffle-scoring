import { describe, expect, it } from "@jest/globals";

import { PondTurtle } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Pond Turtle card", () => {
  it("scores 5 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(PondTurtle),
    });
    const game = createGame(forest);

    const points = PondTurtle.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores 5 points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(PondTurtle),
    });
    const game = createGame(forest);

    const points = PondTurtle.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(5);
  });
});
