import { describe, expect, it } from "@jest/globals";

import { TawnyOwl } from "@/cards/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Tawny Owl card", () => {
  it("scores 5 points in an empty forest", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(TawnyOwl),
    });
    const game = createGame(forest);

    const points = TawnyOwl.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores 5 points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(TawnyOwl),
    });
    const game = createGame(forest);

    const points = TawnyOwl.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(5);
  });
});
