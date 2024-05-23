import { describe, expect, it } from "@jest/globals";

import { ParasolMushroom } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Parasol Mushroom card", () => {
  it("scores no points in an empty forest", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(ParasolMushroom),
    });
    const game = createGame(forest);

    const points = ParasolMushroom.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(ParasolMushroom),
    });
    const game = createGame(forest);

    const points = ParasolMushroom.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
