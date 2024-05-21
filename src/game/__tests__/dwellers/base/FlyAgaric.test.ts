import { describe, expect, it } from "@jest/globals";

import { FlyAgaric } from "@/game/dwellers";

import {
  createAnyDweller,
  createCompleteForestWithDweller,
  createForestWithDweller,
  createGame,
} from "../../helpers";

describe("A Fly Agaric card", () => {
  it("scores no points in an empty forest", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(FlyAgaric),
    });
    const game = createGame(forest);

    const points = FlyAgaric.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("scores no points in a complete forest", () => {
    const { dweller, tree, forest } = createCompleteForestWithDweller({
      dwellerUnderTest: createAnyDweller(FlyAgaric),
    });
    const game = createGame(forest);

    const points = FlyAgaric.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
