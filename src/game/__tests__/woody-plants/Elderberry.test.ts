import { describe, expect, it } from "@jest/globals";

import { Elderberry } from "@/game/woody-plants";

import {
  createAnyWoodyPlant,
  createCompleteForestWithWoodyPlant,
  createForestWith,
  createGame,
} from "../helpers";

describe("A Elderberry card", () => {
  it("scores no points in an empty forest", () => {
    const woodyPlant = createAnyWoodyPlant(Elderberry);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Elderberry.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { woodyPlant, forest } = createCompleteForestWithWoodyPlant({
      woodyPlantUnderTest: createAnyWoodyPlant(Elderberry),
    });
    const game = createGame(forest);

    const points = Elderberry.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(0);
  });
});
