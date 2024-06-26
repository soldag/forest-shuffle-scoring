import { describe, expect, it } from "@jest/globals";

import { Squeaker } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Squeaker card", () => {
  it("scores 1 point in an empty forest", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(Squeaker),
    });
    const game = createGame(forest);

    const points = Squeaker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(1);
  });

  it("scores 1 point in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(Squeaker),
    });
    const game = createGame(forest);

    const points = Squeaker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(1);
  });
});
