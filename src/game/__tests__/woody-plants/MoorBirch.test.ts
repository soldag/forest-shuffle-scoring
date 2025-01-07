import { describe, expect, it } from "@jest/globals";

import { MoorBirch } from "@/game/woody-plants";

import { createAnyWoodyPlant, createForestWith, createGame } from "../helpers";

describe("A Moor Birch card", () => {
  it("always scores 1 point", () => {
    const woodyPlant = createAnyWoodyPlant(MoorBirch);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = MoorBirch.score({ game, forest, woodyPlant });

    expect(points).toBe(1);
  });
});
