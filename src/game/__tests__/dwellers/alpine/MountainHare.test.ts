import { describe, expect, it } from "@jest/globals";

import { EuropeanHare, MountainHare } from "@/game/dwellers";

import {
  createAllDwellers,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Mountain Hare card", () => {
  it.each([
    [1, 1, 0],
    [2, 1, 1],
    [5, 3, 2],
  ])(
    "scores %i points if there are %i Mountain Hare and %i European Hare cards",
    (expectedPoints, mountainHareCount, europeanHareCount) => {
      const allMountainHares = createAllDwellers(MountainHare);
      const allEuropeanHares = createAllDwellers(EuropeanHare);
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: allMountainHares[0],
        otherDwellers: [
          ...allMountainHares.slice(1, mountainHareCount),
          ...allEuropeanHares.slice(0, europeanHareCount),
        ],
      });
      const game = createGame(forest);

      const points = MountainHare.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
