import { describe, expect, it } from "@jest/globals";
import * as _ from "lodash-es";

import { CardType } from "@/game/types";
import * as WoodyPlants from "@/game/woody-plants";
import {
  Beech,
  Birch,
  Blackthorne,
  Cerro,
  DouglasFir,
  Elderberry,
  EuropeanLarch,
  HorseChestnut,
  Linden,
  MoorBirch,
  Oak,
  OhChristmasTree,
  StonePine,
} from "@/game/woody-plants";

import {
  createAnyWoodyPlant,
  createForestForWoodyPlantTest,
  createGame,
} from "../helpers";

describe("A Oak card", () => {
  const treeBlueprints = Object.values(WoodyPlants).filter((t) =>
    t.types.includes(CardType.Tree),
  );

  it("scores 10 points if forest has all tree species", () => {
    const { forest, woodyPlant } = createForestForWoodyPlantTest({
      woodyPlantUnderTest: createAnyWoodyPlant(Oak),
      otherWoodyPlants: treeBlueprints.map(createAnyWoodyPlant),
    });
    const game = createGame(forest);

    const points = Oak.score({ game, forest, woodyPlant });

    expect(points).toBe(10);
  });

  it.each(_.range(1, 6).map((x) => [x]))(
    "scores no points if forest has %i tree species",
    (otherWoodyPlantCount) => {
      const { forest, woodyPlant } = createForestForWoodyPlantTest({
        woodyPlantUnderTest: createAnyWoodyPlant(Oak),
        otherWoodyPlants: treeBlueprints
          .slice(0, otherWoodyPlantCount)
          .map(createAnyWoodyPlant),
      });
      const game = createGame(forest);

      const points = Oak.score({ game, forest, woodyPlant });

      expect(points).toBe(0);
    },
  );

  it("ignores shrubs when scoring", () => {
    const { forest, woodyPlant } = createForestForWoodyPlantTest({
      woodyPlantUnderTest: createAnyWoodyPlant(Oak),
      otherWoodyPlants: [
        // Shrubs
        createAnyWoodyPlant(Elderberry),
        createAnyWoodyPlant(Blackthorne),
        // Trees
        createAnyWoodyPlant(Beech),
        createAnyWoodyPlant(Birch),
        createAnyWoodyPlant(DouglasFir),
        createAnyWoodyPlant(EuropeanLarch),
        createAnyWoodyPlant(HorseChestnut),
      ],
    });
    const game = createGame(forest);

    const points = Oak.score({ game, forest, woodyPlant });

    expect(points).toBe(0);
  });

  it.each([
    [MoorBirch.name, MoorBirch.countsAs, MoorBirch],
    [OhChristmasTree.name, OhChristmasTree.countsAs, OhChristmasTree],
    [Cerro.name, Cerro.countsAs, Cerro],
  ])("treats %s as %s when scoring", (_1, _2, blueprint) => {
    const { forest, woodyPlant } = createForestForWoodyPlantTest({
      woodyPlantUnderTest: createAnyWoodyPlant(Oak),
      otherWoodyPlants: [
        createAnyWoodyPlant(blueprint),
        createAnyWoodyPlant(
          treeBlueprints.find((b) => b.name === blueprint.countsAs)!,
        ),
        createAnyWoodyPlant(Beech),
        createAnyWoodyPlant(EuropeanLarch),
        createAnyWoodyPlant(HorseChestnut),
        createAnyWoodyPlant(Linden),
        createAnyWoodyPlant(StonePine),
      ],
    });
    const game = createGame(forest);

    const points = Oak.score({ game, forest, woodyPlant });

    expect(points).toBe(0);
  });
});
