import { describe, expect, it } from "@jest/globals";

import { createWoodyPlant } from "@/game/factory";
import { Birch } from "@/game/woody-plants";

import { createForestWith, createGame } from "../../helpers";

describe("A Birch card", () => {
  it("always scores 1 point", () => {
    const woodyPlant = createWoodyPlant(Birch);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Birch.score({ game, forest, woodyPlant });

    expect(points).toBe(1);
  });
});
