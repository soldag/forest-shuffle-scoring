import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/game";
import { EuropeanHare, RedFox } from "@/game/dwellers";
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
    [0, 0],
    [2, 1],
    [18, 9],
  ])(
    "scores %i points if there are %i European Hare cards",
    (expectedPoints, count) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(RedFox),
        otherDwellers: createAllDwellers(EuropeanHare).slice(0, count),
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
