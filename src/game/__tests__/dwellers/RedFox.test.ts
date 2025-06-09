import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/game";
import { EuropeanHare, MountainHare, RedFox } from "@/game/dwellers";
import { createDweller } from "@/game/factory";

import { createFakeWoodyPlant } from "../fake";
import {
  addDwellersToWoodyPlant,
  createAllDwellers,
  createAnyDweller,
  createForestForDwellerTest,
  createForestWith,
  createGame,
} from "../helpers";

describe("A Red Fox card", () => {
  it.each([
    [0, 0, 0],
    [2, 1, 0],
    [2, 0, 1],
    [18, 6, 3],
  ])(
    "scores %i points if there are %i European Hare cards and %i Mountain Hare cards",
    (expectedPoints, europeanHareCount, mountainHareCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(RedFox),
        otherDwellers: [
          ...createAllDwellers(EuropeanHare).slice(0, europeanHareCount),
          ...createAllDwellers(MountainHare).slice(0, mountainHareCount),
        ],
      });
      const game = createGame(forest);

      const points = RedFox.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("takes into account European Hare cards sharing a slot when scoring", () => {
    const dweller = createDweller(
      RedFox,
      RedFox.variants.find((v) => v.position === DwellerPosition.Left)!,
    );
    const otherDwellers = createAllDwellers(EuropeanHare)
      .filter((v) => v.position === DwellerPosition.Right)
      .slice(0, 2);
    const woodyPlant = addDwellersToWoodyPlant(
      createFakeWoodyPlant(),
      dweller,
      ...otherDwellers,
    );
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = RedFox.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(4);
  });
});
