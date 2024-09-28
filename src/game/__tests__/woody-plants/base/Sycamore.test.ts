import { describe, expect, it } from "@jest/globals";

import { DwellerPosition } from "@/game";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { createWoodyPlant } from "@/game/factory";
import { Sapling, Sycamore } from "@/game/woody-plants";

import { createFakeDweller, createFakeWoodyPlants } from "../../fake";
import {
  addDwellersToWoodyPlant,
  createForestWith,
  createGame,
} from "../../helpers";

describe("A Sycamore card", () => {
  it("scores 1 point if there are no other trees", () => {
    const woodyPlant = createWoodyPlant(Sycamore);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, woodyPlant });

    expect(points).toBe(1);
  });

  it("scores 3 points if there are 3 trees", () => {
    const woodyPlant = createWoodyPlant(Sycamore);
    const otherWoodyPlants = createFakeWoodyPlants(2);
    const forest = createForestWith({
      woodyPlants: [woodyPlant, ...otherWoodyPlants],
    });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, woodyPlant });

    expect(points).toBe(3);
  });

  it("scores for Saplings", () => {
    const woodyPlant = createWoodyPlant(Sycamore);
    const otherWoodyPlant = createWoodyPlant(Sapling);
    const forest = createForestWith({
      woodyPlants: [woodyPlant, otherWoodyPlant],
    });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, woodyPlant });

    expect(points).toBe(2);
  });

  it("ignores cards increasing the tree count when scoring", () => {
    const woodyPlant = addDwellersToWoodyPlant(
      createWoodyPlant(Sycamore),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          ...DEFAULT_MODIFIERS,
          treeCount: 1,
        },
      }),
    );
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Sycamore.score({ game, forest, woodyPlant });

    expect(points).toBe(1);
  });
});
