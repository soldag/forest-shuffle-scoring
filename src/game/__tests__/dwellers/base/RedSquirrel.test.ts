import { describe, expect, it } from "@jest/globals";

import { RedSquirrel } from "@/game/dwellers";
import { createTree } from "@/game/factory";
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
} from "@/game/trees";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Red Squirrel card", () => {
  it.each([
    [0, Beech.name, Beech],
    [0, Birch.name, Birch],
    [0, DouglasFir.name, DouglasFir],
    [0, HorseChestnut.name, HorseChestnut],
    [0, Linden.name, Linden],
    [5, Oak.name, Oak],
    [0, Sapling.name, Sapling],
    [0, SilverFir.name, SilverFir],
    [0, Sycamore.name, Sycamore],
  ])(
    "scores %i points on top on a %s tree",
    (expectedPoints, _, treeBlueprint) => {
      const { dweller, tree, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(RedSquirrel),
        treeUnderTest: createTree(treeBlueprint),
      });
      const game = createGame(forest);

      const points = RedSquirrel.score({ game, forest, tree, dweller });

      expect(points).toBe(expectedPoints);
    },
  );
});
