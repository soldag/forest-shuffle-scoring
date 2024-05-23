import { describe, expect, it } from "@jest/globals";

import { GreatSpottedWoodpecker } from "@/game/dwellers";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";
import { Sapling } from "@/game/trees";
import { DwellerPosition } from "@/game/types";

import { createFakeDweller, createFakeTree, createFakeTrees } from "../../fake";
import {
  addDwellersToTree,
  createAnyDweller,
  createForestForDwellerTest,
  createForestWith,
  createGame,
  createTrees,
} from "../../helpers";

describe("A Great Spotted Woodpecker card", () => {
  it("scores 10 points if forest has the most trees", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
      otherTrees: createFakeTrees(2),
    });
    const otherForest = createForestWith({ trees: createFakeTrees(1) });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });

  it("scores 10 points if forest is tied for the most trees", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWith({ trees: createFakeTrees(1) });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(10);
  });

  it("scores no points if forest doesn't have the most trees", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWith({ trees: createFakeTrees(2) });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("takes into account Sapling cards when scoring", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWith({ trees: createTrees(Sapling, 2) });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });

  it("takes into account cards increasing the tree count when scoring", () => {
    const { dweller, tree, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherTree = addDwellersToTree(
      createFakeTree(),
      createFakeDweller(DwellerPosition.Left, {
        modifiers: {
          ...DEFAULT_MODIFIERS,
          treeCount: 2,
        },
      }),
    );
    const otherForest = createForestWith({ trees: [otherTree] });
    const game = createGame(forest, otherForest);

    const points = GreatSpottedWoodpecker.score({
      game,
      forest,
      tree,
      dweller,
    });

    expect(points).toBe(0);
  });
});
