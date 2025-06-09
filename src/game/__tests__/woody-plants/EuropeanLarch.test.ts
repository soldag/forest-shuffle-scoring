import { describe, expect, it } from "@jest/globals";

import { EuropeanLarch } from "@/game/woody-plants";

import { createAnyWoodyPlant, createForestWith, createGame } from "../helpers";

describe("An Alpine Larch card", () => {
  it("always scores 3 points", () => {
    const woodyPlant = createAnyWoodyPlant(EuropeanLarch);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = EuropeanLarch.score({ game, forest, woodyPlant });

    expect(points).toBe(3);
  });
});
