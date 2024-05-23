import { describe, expect, it } from "@jest/globals";
import * as _ from "lodash-es";

import { WildStrawberries } from "@/game/dwellers";
import { createTree } from "@/game/factory";
import * as Trees from "@/game/trees";
import { Sapling } from "@/game/trees";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../../helpers";

describe("A Wild Strawberries card", () => {
  // The Sapling does not count as species
  const treeSpecies = Object.values(Trees).filter((t) => t !== Sapling);

  it("scores 10 points if forest has all tree species", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
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

  it.each(_.range(1, 7).map((x) => [x]))(
    "scores no points if forest has %i trees",
    (treeCount) => {
      const trees = treeSpecies.slice(0, treeCount).map(createTree);
      const { dweller, tree, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(WildStrawberries),
        otherTrees: trees,
      });
      const game = createGame(forest);

      const points = WildStrawberries.score({ game, forest, tree, dweller });

      expect(points).toBe(0);
    },
  );
});
