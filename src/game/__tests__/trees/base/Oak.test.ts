import { describe, expect, it } from "@jest/globals";
import * as _ from "lodash-es";

import { createTree } from "@/game/factory";
import * as Trees from "@/game/trees";
import { Oak, Sapling } from "@/game/trees";

import { createForestWithTrees, createGame } from "../../helpers";

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

  it.each(_.range(1, 6).map((x) => [x]))(
    "scores no points if forest has %i other trees",
    (otherTreeCount) => {
      const otherTrees = treeSpecies.slice(0, otherTreeCount).map(createTree);
      const oak = createTree(Oak);
      const forest = createForestWithTrees(oak, ...otherTrees);
      const game = createGame(forest);

      const points = Oak.score({ game, forest, tree: oak });

      expect(points).toBe(0);
    },
  );
});
