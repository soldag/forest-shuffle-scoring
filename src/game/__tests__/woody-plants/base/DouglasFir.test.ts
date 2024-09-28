import { describe, expect, it } from "@jest/globals";

import { createWoodyPlant } from "@/game/factory";
import { DouglasFir } from "@/game/woody-plants";

import { createForestWith, createGame } from "../../helpers";

describe("A Douglas Fir card", () => {
  it("always scores 5 points", () => {
    const woodyPlant = createWoodyPlant(DouglasFir);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = DouglasFir.score({ game, forest, woodyPlant });

    expect(points).toBe(5);
  });
});
