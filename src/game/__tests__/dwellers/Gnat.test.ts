import { describe, expect, it } from "@jest/globals";

import { Gnat } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Gnat card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [5, 5],
  ])("scores %i points if there are %i bat cards", (expectedPoints, count) => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(Gnat),
      otherDwellers: createFakeDwellers(count, DwellerPosition.Left, {
        types: [CardType.Bat],
      }),
    });
    const game = createGame(forest);

    const points = Gnat.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
