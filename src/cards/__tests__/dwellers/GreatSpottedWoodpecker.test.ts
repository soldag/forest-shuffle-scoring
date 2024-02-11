import { describe, expect, it } from "@jest/globals";

import { GreatSpottedWoodpecker } from "@/cards/dwellers";
import { DEFAULT_MODIFIERS } from "@/cards/dwellers/modifiers";
import { createTree } from "@/cards/factory";
import { Sapling } from "@/cards/trees";
import { DwellerPosition } from "@/cards/types";

import { createFakeDweller, createFakeTree, createFakeTrees } from "../fake";
import {
  addDwellersToTree,
  createAnyDweller,
  createForestWithDweller,
  createForestWithTrees,
  createGame,
} from "../helpers";

describe("A Great Spotted Woodpecker card", () => {
  it("scores 10 points if forest has the most trees", () => {
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
      otherTrees: createFakeTrees(2),
    });
    const otherForest = createForestWithTrees(createFakeTree());
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
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWithTrees(createFakeTree());
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
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWithTrees(...createFakeTrees(2));
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
    const { dweller, tree, forest } = createForestWithDweller({
      dwellerUnderTest: createAnyDweller(GreatSpottedWoodpecker),
    });
    const otherForest = createForestWithTrees(
      createTree(Sapling),
      createTree(Sapling),
    );
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
    const { dweller, tree, forest } = createForestWithDweller({
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
    const otherForest = createForestWithTrees(otherTree);
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
