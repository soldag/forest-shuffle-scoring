import { describe, expect, it } from "@jest/globals";

import { EuropeanHare, MountainHare } from "@/game/dwellers";

import {
  createAllDwellers,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A European Hare card", () => {
  it.each([
    [1, 1, 0],
    [2, 1, 1],
    [5, 3, 2],
  ])(
    "scores %i points if there are %i European Hare and %i Mountain Hare cards",
    (expectedPoints, europeanHareCount, mountainHareCount) => {
      const allEuropeanHares = createAllDwellers(EuropeanHare);
      const allMountainHares = createAllDwellers(MountainHare);
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: allEuropeanHares[0],
        otherDwellers: [
          ...allMountainHares.slice(1, europeanHareCount),
          ...allEuropeanHares.slice(0, mountainHareCount),
        ],
      });
      const game = createGame(forest);

      const points = EuropeanHare.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
