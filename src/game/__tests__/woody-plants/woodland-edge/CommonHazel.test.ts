import { describe, expect, it } from "@jest/globals";

import { CommonHazel } from "@/game/woody-plants";

import {
  createAnyWoodyPlant,
  createCompleteForestWithWoodyPlant,
  createForestWith,
  createGame,
} from "../../helpers";

describe("A Common Hazel card", () => {
  it("scores no points in an empty forest", () => {
    const woodyPlant = createAnyWoodyPlant(CommonHazel);
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = CommonHazel.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { woodyPlant, forest } = createCompleteForestWithWoodyPlant({
      woodyPlantUnderTest: createAnyWoodyPlant(CommonHazel),
    });
    const game = createGame(forest);

    const points = CommonHazel.score({
      game,
      forest,
      woodyPlant,
    });

    expect(points).toBe(0);
  });
});
