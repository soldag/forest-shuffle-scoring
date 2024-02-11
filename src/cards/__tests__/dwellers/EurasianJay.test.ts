import { describe, expect, it } from "@jest/globals";

import { EurasianJay } from "@/cards/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A European Badger card", () => {
  it("scores 3 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(EurasianJay),
    });
    const game = createGame(forest);

    const points = EurasianJay.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(3);
  });

  it("scores 3 points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(EurasianJay),
    });
    const game = createGame(forest);

    const points = EurasianJay.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(3);
  });
});
