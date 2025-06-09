import { describe, expect, it } from "@jest/globals";
import * as _ from "lodash-es";

import { WildStrawberries } from "@/game/dwellers";
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
  OhChristmasTree,
} from "@/game/woody-plants";

import {
  createAnyDweller,
  createAnyWoodyPlant,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Wild Strawberries card", () => {
  const treeBlueprints = Object.values(WoodyPlants).filter((w) =>
    w.types.includes(CardType.Tree),
  );

  it("scores 10 points if forest has all tree species", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(WildStrawberries),
      otherWoodyPlants: treeBlueprints.map(createAnyWoodyPlant),
    });
    const game = createGame(forest);

    const points = WildStrawberries.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(10);
  });

  it.each(_.range(1, 7).map((x) => [x]))(
    "scores no points if forest has %i trees",
    (treeCount) => {
      const trees = treeBlueprints.slice(0, treeCount).map(createAnyWoodyPlant);
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(WildStrawberries),
        otherWoodyPlants: trees,
      });
      const game = createGame(forest);

      const points = WildStrawberries.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(0);
    },
  );

  it("ignores shrubs when scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(WildStrawberries),
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
        createAnyWoodyPlant(Linden),
      ],
    });
    const game = createGame(forest);

    const points = WildStrawberries.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });

  it.each([
    [MoorBirch.name, MoorBirch.countsAs, MoorBirch],
    [OhChristmasTree.name, OhChristmasTree.countsAs, OhChristmasTree],
    [Cerro.name, Cerro.countsAs, Cerro],
  ])("treats %s as %s when scoring", (_1, _2, blueprint) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(WildStrawberries),
      otherWoodyPlants: [
        createAnyWoodyPlant(blueprint),
        createAnyWoodyPlant(
          treeBlueprints.find((b) => b.name === blueprint.countsAs)!,
        ),
        createAnyWoodyPlant(WoodyPlants.Beech),
        createAnyWoodyPlant(WoodyPlants.EuropeanLarch),
        createAnyWoodyPlant(WoodyPlants.HorseChestnut),
        createAnyWoodyPlant(WoodyPlants.Linden),
        createAnyWoodyPlant(WoodyPlants.StonePine),
        createAnyWoodyPlant(WoodyPlants.Sycamore),
      ],
    });
    const game = createGame(forest);

    const points = WildStrawberries.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });
});
