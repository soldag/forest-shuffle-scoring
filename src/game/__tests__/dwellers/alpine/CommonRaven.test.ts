import { describe, expect, it } from "@jest/globals";

import { CommonRaven } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Common Raven card", () => {
  it("scores 5 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(CommonRaven),
    });
    const game = createGame(forest);

    const points = CommonRaven.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores 5 points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(CommonRaven),
    });
    const game = createGame(forest);

    const points = CommonRaven.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(5);
  });
});
