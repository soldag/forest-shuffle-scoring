import { describe, expect, it } from "@jest/globals";

import { Steinbock } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Steinbock card", () => {
  it("scores 10 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Steinbock),
    });
    const game = createGame(forest);

    const points = Steinbock.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });

  it("scores 10 points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(Steinbock),
    });
    const game = createGame(forest);

    const points = Steinbock.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });
});
