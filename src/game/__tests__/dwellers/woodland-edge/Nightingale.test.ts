import { describe, expect, it } from "@jest/globals";

import { CardType } from "@/game";
import { Nightingale } from "@/game/dwellers";

import { createFakeWoodyPlant } from "../../fake";
import {
  addDwellersToWoodyPlant,
  createAnyDweller,
  createForestWith,
  createGame,
} from "../../helpers";

describe("A Nightingale card", () => {
  it("scores 5 points if it's on a shrub", () => {
    const dweller = createAnyDweller(Nightingale);
    const woodyPlant = addDwellersToWoodyPlant(
      createFakeWoodyPlant({ types: [CardType.Shrub] }),
      dweller,
    );
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Nightingale.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(5);
  });

  it("scores no points if it's on a tree", () => {
    const dweller = createAnyDweller(Nightingale);
    const woodyPlant = addDwellersToWoodyPlant(
      createFakeWoodyPlant({ types: [CardType.Tree] }),
      dweller,
    );
    const forest = createForestWith({ woodyPlants: [woodyPlant] });
    const game = createGame(forest);

    const points = Nightingale.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(0);
  });
});
