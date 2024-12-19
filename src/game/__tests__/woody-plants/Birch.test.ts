import { describe, expect, it } from "@jest/globals";

import { Birch } from "@/game/woody-plants";

import { createAnyWoodyPlant, createForestWith, createGame } from "../helpers";

describe("A Birch card", () => {
  it("always scores 1 point", () => {
    const woodyPlant = createAnyWoodyPlant(Birch);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Birch.score({ game, forest, woodyPlant });

    expect(points).toBe(1);
  });
});
