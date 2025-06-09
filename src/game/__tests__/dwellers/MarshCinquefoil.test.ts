import { describe, expect, it } from "@jest/globals";

import { MarshCinquefoil } from "@/game/dwellers";
import { CardType } from "@/game/types";
import { Sapling } from "@/game/woody-plants";

import { createFakeWoodyPlants } from "../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
  createWoodyPlants,
} from "../helpers";

describe("A Marsh Cinquefoil card", () => {
  it.each([
    [15, 1],
    [7, 6],
    [3, 11],
  ])("scores %i points if there are %i trees", (expectedPoints, count) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(MarshCinquefoil),
      otherWoodyPlants: createFakeWoodyPlants(count),
    });
    const game = createGame(forest);

    const points = MarshCinquefoil.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });

  it("considers Saplings for scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(MarshCinquefoil),
      otherWoodyPlants: createWoodyPlants(Sapling, 15),
    });
    const game = createGame(forest);

    const points = MarshCinquefoil.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(3);
  });

  it("ignores shrubs for scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(MarshCinquefoil),
      otherWoodyPlants: createFakeWoodyPlants(15, {
        types: [CardType.Shrub],
      }),
    });
    const game = createGame(forest);

    const points = MarshCinquefoil.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(15);
  });
});
