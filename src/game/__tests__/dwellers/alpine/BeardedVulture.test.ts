import { describe, expect, it } from "@jest/globals";

import { BeardedVulture } from "@/game/dwellers";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Bearded Vulture card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [5, 5],
  ])("scores %i points with %i cave cards", (expectedPoints, caveCardCount) => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(BeardedVulture),
      caveCardCount,
    });
    const game = createGame(forest);

    const points = BeardedVulture.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
