import { describe, expect, it } from "@jest/globals";

import { CardType, DwellerPosition } from "@/game/types";
import { SwissPine } from "@/game/woody-plants";

import { createFakeDwellers, createFakeWoodyPlants } from "../fake";
import {
  createAnyWoodyPlant,
  createForestForWoodyPlantTest,
  createGame,
} from "../helpers";

describe("A Swiss Pine card", () => {
  it.each([
    [1, 0, 0],
    [2, 0, 1],
    [2, 1, 0],
    [10, 4, 5],
  ])(
    "scores %i points if there are %i other alp woody plant cards and %i alp dweller cards",
    (expectedPoints, woodyPlantCount, dwellerCount) => {
      const otherWoodyPlants = createFakeWoodyPlants(woodyPlantCount, {
        types: [CardType.Alps],
      });
      expect(otherWoodyPlants.length).toBe(woodyPlantCount);
      const dwellers = createFakeDwellers(dwellerCount, DwellerPosition.Left, {
        types: [CardType.Alps],
      });
      const { woodyPlant, forest } = createForestForWoodyPlantTest({
        woodyPlantUnderTest: createAnyWoodyPlant(SwissPine),
        otherWoodyPlants,
        dwellers,
      });
      const game = createGame(forest);

      const points = SwissPine.score({
        game,
        forest,
        woodyPlant,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
