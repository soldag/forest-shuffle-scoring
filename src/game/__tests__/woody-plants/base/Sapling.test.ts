import { describe, expect, it } from "@jest/globals";

import { createWoodyPlant } from "@/game/factory";
import { Sapling } from "@/game/woody-plants";

import { createForestWith, createGame } from "../../helpers";

describe("A Sapling card", () => {
  it("always scores 0 points", () => {
    const woodyPlant = createWoodyPlant(Sapling);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Sapling.score({ game, forest, woodyPlant });

    expect(points).toBe(0);
  });
});
