import { describe, expect, it } from "@jest/globals";

import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { createWoodyPlant } from "@/game/factory";
import { DwellerPosition } from "@/game/types";
import { Linden } from "@/game/woody-plants";

import { createFakeDweller } from "../../fake";
import {
  addDwellersToWoodyPlant,
  createForestWith,
  createGame,
  createWoodyPlants,
} from "../../helpers";

describe("A Linden card", () => {
  const woodyPlants = createWoodyPlants(Linden, 2);
  const forest = createForestWith({ woodyPlants });

  it("scores 3 points if forest has the most Linden trees", () => {
    const otherForest = createForestWith({
      woodyPlants: createWoodyPlants(Linden, 1),
    });
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, woodyPlant: woodyPlants[0]! });

    expect(points).toBe(3);
  });

  it("scores 3 points if forest is tied for the most Linden trees", () => {
    const otherForest = createForestWith({
      woodyPlants: createWoodyPlants(Linden, 2),
    });
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, woodyPlant: woodyPlants[0]! });

    expect(points).toBe(3);
  });

  it("scores 1 point if forest doesn't have the most Linden trees", () => {
    const otherForest = createForestWith({
      woodyPlants: createWoodyPlants(Linden, 3),
    });
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, woodyPlant: woodyPlants[0]! });

    expect(points).toBe(1);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const otherWoodyPlant = addDwellersToWoodyPlant(
      createWoodyPlant(Linden),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          ...DEFAULT_MODIFIERS,
          treeCount: 2,
        },
      }),
    );
    const otherForest = createForestWith({ woodyPlants: [otherWoodyPlant] });
    const game = createGame(forest, otherForest);

    const points = Linden.score({ game, forest, woodyPlant: woodyPlants[0]! });

    expect(points).toBe(1);
  });
});
