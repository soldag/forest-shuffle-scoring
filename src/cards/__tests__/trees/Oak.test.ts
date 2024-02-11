import { describe, expect, it } from "@jest/globals";

import { createTree } from "@/cards/factory";
import * as Trees from "@/cards/trees";
import { Oak, Sapling } from "@/cards/trees";
import { TreeCardBlueprint } from "@/cards/types";

import { createForestWithTrees, createGame } from "../helpers";

describe("A Oak card", () => {
  // The Sapling does not count as species
  const treeSpecies = Object.values(Trees).filter(
    (t) => t.name !== Sapling.name,
  );

  it("scores 10 points if forest has all tree species", () => {
    const trees = treeSpecies.map(createTree);
    const oak = trees.find((t) => t.name === Oak.name)!;
    const forest = createForestWithTrees(...trees);
    const game = createGame(forest);

    const points = Oak.score({ game, forest, tree: oak });

    expect(points).toBe(10);
  });

  const combinations = treeSpecies
    .filter((t) => t.name !== Oak.name)
    .map((t) => [t]);
  it.each(combinations)(
    "scores no points if forest doesn't have all tree species",
    (treeToExclude: TreeCardBlueprint) => {
      const trees = treeSpecies
        .filter((t) => t !== treeToExclude)
        .map(createTree);
      const oak = trees.find((t) => t.name === Oak.name)!;
      const forest = createForestWithTrees(...trees);
      const game = createGame(forest);

      const points = Oak.score({ game, forest, tree: oak });

      expect(points).toBe(0);
    },
  );
});
