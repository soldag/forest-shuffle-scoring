import { describe, expect, it } from "@jest/globals";

import { WildStrawberries } from "@/game/dwellers";
import { createTree } from "@/game/factory";
import * as Trees from "@/game/trees";
import { Sapling } from "@/game/trees";

import {
  createAnyDweller,
  createForestWithDweller,
  createGame,
} from "../helpers";

describe("A Wild Strawberries card", () => {
  // The Sapling does not count as species
  const treeSpecies = Object.values(Trees).filter((t) => t !== Sapling);

  it("scores 10 points if forest has all tree species", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(WildStrawberries),
      otherTrees: treeSpecies.map(createTree),
    });
    const game = createGame(forest);

    const points = WildStrawberries.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });

  it.each(treeSpecies.map((t) => [t.name]))(
    "scores no points if forest doesn't have a %s tree",
    (treeNameToExclude: string) => {
      const { dweller, tree, forest } = createForestWithDweller({
        dwellerUnderTest: createAnyDweller(WildStrawberries),
        otherTrees: treeSpecies
          .filter((t) => t.name !== treeNameToExclude)
          .map(createTree),
      });
      const game = createGame(forest);

      const points = WildStrawberries.score({ game, forest, tree, dweller });

      expect(points).toBe(0);
    },
  );
});
