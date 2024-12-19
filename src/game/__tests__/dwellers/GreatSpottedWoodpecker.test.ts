import { describe, expect, it } from "@jest/globals";

import { GreatSpottedWoodpecker } from "@/game/dwellers";
import { DwellerPosition } from "@/game/types";
import { Sapling } from "@/game/woody-plants";

import {
  createFakeDweller,
  createFakeWoodyPlant,
  createFakeWoodyPlants,
} from "../fake";
import {
  addDwellersToWoodyPlant,
  createAnyDweller,
  createForestForDwellerTest,
  createForestWith,
  createGame,
  createWoodyPlants,
} from "../helpers";

describe("A Great Spotted Woodpecker card", () => {
  it("scores 10 points if forest has the most trees", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
      otherWoodyPlants: createFakeWoodyPlants(2),
    });
    const otherForest = createForestWith({
      woodyPlants: createFakeWoodyPlants(1),
    });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(10);
  });

  it("scores 10 points if forest is tied for the most trees", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWith({
      woodyPlants: createFakeWoodyPlants(1),
    });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(10);
  });

  it("scores no points if forest doesn't have the most trees", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWith({
      woodyPlants: createFakeWoodyPlants(2),
    });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("takes into account Sapling cards when scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWith({
      woodyPlants: createWoodyPlants(Sapling, 2),
    });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherWoodyPlant = addDwellersToWoodyPlant(
      createFakeWoodyPlant(),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          woodyPlantCount: () => 2,
        },
      }),
    );
    const otherForest = createForestWith({ woodyPlants: [otherWoodyPlant] });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });
});
