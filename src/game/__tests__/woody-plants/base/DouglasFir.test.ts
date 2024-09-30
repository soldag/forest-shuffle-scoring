import { describe, expect, it } from "@jest/globals";

import { DouglasFir } from "@/game/woody-plants";

import {
  createAnyWoodyPlant,
  createForestWith,
  createGame,
} from "../../helpers";

describe("A Douglas Fir card", () => {
  it("always scores 5 points", () => {
    const woodyPlant = createAnyWoodyPlant(DouglasFir);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = DouglasFir.score({ game, forest, woodyPlant });

    expect(points).toBe(5);
  });
});
