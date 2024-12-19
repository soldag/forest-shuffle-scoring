import { describe, expect, it } from "@jest/globals";

import { Chaffinch } from "@/game/dwellers";
import {
  Beech,
  Birch,
  DouglasFir,
  HorseChestnut,
  Linden,
  Oak,
  Sapling,
  SilverFir,
  Sycamore,
} from "@/game/woody-plants";

import {
  createAnyDweller,
  createAnyWoodyPlant,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Chaffinch card", () => {
  it.each([
    [5, Beech.name, Beech],
    [0, Birch.name, Birch],
    [0, DouglasFir.name, DouglasFir],
    [0, HorseChestnut.name, HorseChestnut],
    [0, Linden.name, Linden],
    [0, Oak.name, Oak],
    [0, Sapling.name, Sapling],
    [0, SilverFir.name, SilverFir],
    [0, Sycamore.name, Sycamore],
  ])(
    "scores %i points on top on a %s card",
    (expectedPoints, _, woodyPlantBlueprint) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(Chaffinch),
        woodyPlantUnderTest: createAnyWoodyPlant(woodyPlantBlueprint),
      });
      const game = createGame(forest);

      const points = Chaffinch.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
