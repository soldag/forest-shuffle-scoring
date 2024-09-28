import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game";
import { RedDeer } from "@/game/dwellers";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { Sapling } from "@/game/woody-plants";

import {
  createFakeDweller,
  createFakeDwellers,
  createFakeWoodyPlants,
} from "../../fake";
import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
  createWoodyPlants,
} from "../../helpers";

describe("A Red Deer card", () => {
  it.each([
    [1, 0, 1],
    [3, 1, 2],
    [5, 2, 3],
  ])(
    "scores %i points for %i plant and %i tree cards",
    (expectedPoints, plantCount, treeCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(RedDeer),
        otherDwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
          types: [CardType.Plant],
        }),
        otherWoodyPlants: createFakeWoodyPlants(treeCount),
      });
      const game = createGame(forest);

      const points = RedDeer.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );

  it("takes into account Sapling cards when scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(RedDeer),
      otherWoodyPlants: createWoodyPlants(Sapling, 2),
    });
    const game = createGame(forest);

    const points = RedDeer.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(2);
  });

  it("ignores cards increasing the tree count when scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(RedDeer),
      otherDwellers: [
        createFakeDweller(DwellerPosition.Left, {
          modifiers: {
            ...DEFAULT_MODIFIERS,
            treeCount: 1,
          },
        }),
      ],
    });
    const game = createGame(forest);

    const points = RedDeer.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(2);
  });
});
