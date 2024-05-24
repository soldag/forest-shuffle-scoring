import { describe, expect, it } from "@jest/globals";

import { Enzian } from "@/game/dwellers";
import { CardType, DwellerPosition } from "@/game/types";

import { createFakeDwellers } from "../../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("An Enzian card", () => {
  it.each([
    [0, 0],
    [2, 1],
    [4, 2],
    [10, 5],
  ])(
    "scores %i points for %i butterfly cards",
    (expectedPoints, butterflyCount) => {
      const { dweller, tree, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Enzian),
        otherDwellers: createFakeDwellers(butterflyCount, DwellerPosition.Top, {
          types: [CardType.Butterfly],
        }),
      });
      const game = createGame(forest);

      const points = Enzian.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
