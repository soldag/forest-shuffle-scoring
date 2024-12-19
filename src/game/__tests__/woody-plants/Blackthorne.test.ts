import { describe, expect, it } from "@jest/globals";

import { Blackthorne } from "@/game/woody-plants";

import {
  createAnyWoodyPlant,
  createCompleteForestWithWoodyPlant,
  createForestWith,
  createGame,
} from "../helpers";

describe("A Blackthorne card", () => {
  it("scores no points in an empty forest", () => {
    const woodyPlant = createAnyWoodyPlant(Blackthorne);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Blackthorne.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { woodyPlant, forest } = createCompleteForestWithWoodyPlant({
      woodyPlantUnderTest: createAnyWoodyPlant(Blackthorne),
    });
    const game = createGame(forest);

    const points = Blackthorne.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(0);
  });
});
