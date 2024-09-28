import { describe, expect, it } from "@jest/globals";

import { createWoodyPlant } from "@/game/factory";
import { AlpineLarch } from "@/game/woody-plants";

import { createForestWith, createGame } from "../../helpers";

describe("An Alpine Larch card", () => {
  it("always scores 3 points", () => {
    const woodyPlant = createWoodyPlant(AlpineLarch);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = AlpineLarch.score({ game, forest, woodyPlant });

    expect(points).toBe(3);
  });
});
