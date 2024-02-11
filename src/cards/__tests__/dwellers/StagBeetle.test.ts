import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/cards";
import { StagBeetle } from "@/cards/dwellers";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Stag Beetle card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [5, 5],
  ])(
    "scores %i points if there are %i pawed animal cards",
    (expectedPoints, count) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(StagBeetle),
        otherDwellers: createFakeDwellers(count, DwellerPosition.Left, {
          types: [CardType.PawedAnimal],
        }),
      });
      const game = createGame(forest);

      const points = StagBeetle.score({
        game,
        forest,
        tree,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
