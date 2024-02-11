import { describe, expect, it } from "@jest/globals";

import { WildStrawberries } from "@/cards/dwellers";
import { createTree } from "@/cards/factory";
import * as Trees from "@/cards/trees";
import { Sapling } from "@/cards/trees";

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
