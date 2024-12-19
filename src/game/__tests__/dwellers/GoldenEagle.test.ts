import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game";
import { GoldenEagle } from "@/game/dwellers";

import { createFakeDwellers } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Golden Eagle card", () => {
  it.each([
    [0, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [5, 2, 3],
  ])(
    "scores %i points for %i amphibian and %i pawed-animal cards",
    (expectedPoints, amphibianCount, pawedCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(GoldenEagle),
        otherDwellers: [
          ...createFakeDwellers(amphibianCount, DwellerPosition.Bottom, {
            types: [CardType.Amphibian],
          }),
          ...createFakeDwellers(pawedCount, DwellerPosition.Left, {
            types: [CardType.PawedAnimal],
          }),
        ],
      });
      const game = createGame(forest);

      const points = GoldenEagle.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
