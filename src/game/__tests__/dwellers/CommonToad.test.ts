import { describe, expect, it } from "@jest/globals";

import { CommonToad } from "@/game/dwellers";

import { createFakeWoodyPlant } from "../fake";
import {
  addDwellersToWoodyPlant,
  createAllDwellers,
  createAnyDweller,
  createForestForDwellerTest,
  createForestWith,
  createGame,
} from "../helpers";

describe("A Common Toad card", () => {
  it("scores no points if it's the only card in its slot", () => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(CommonToad),
    });
    const game = createGame(forest);

    const points = CommonToad.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("scores 5 points if it shares its slot with another Common Toad card", () => {
    const [dweller, otherDweller] = createAllDwellers(CommonToad);
    const woodyPlant = addDwellersToWoodyPlant(
      createFakeWoodyPlant(),
      dweller!,
      otherDweller!,
    );
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = CommonToad.score({
      game,
      forest,
      woodyPlant,
      dweller: dweller!,
    });

    expect(points).toBe(5);
  });
});
