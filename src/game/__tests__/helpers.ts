import * as Dwellers from "@/game/dwellers";
import { createDweller, createTree, generateId } from "@/game/factory";
import * as Trees from "@/game/trees";

import {
  DwellerCard,
  DwellerCardBlueprint,
  Forest,
  Game,
  TreeCard,
  TreeCardBlueprint,
} from "../types";
import { createFakeTree } from "./fake";

export const generateCardIds = (count: number) =>
  Array(count)
    .fill(0)
    .map(() => generateId());

export const createAllDwellers = (blueprint: DwellerCardBlueprint) =>
  blueprint.variants
    .map((v) => createDweller(blueprint, v))
    .toSorted((a, b) => a.id.localeCompare(b.id));

export const createAnyDweller = (blueprint: DwellerCardBlueprint) =>
  createDweller(blueprint, blueprint.variants[0]!);

export const createDwellerSets = (
  blueprintUnderTest: DwellerCardBlueprint,
  otherBlueprints: DwellerCardBlueprint[],
  lengths: number[],
) => {
  const totalCount = lengths.reduce((a, b) => a + b, 0);
  const ids = generateCardIds(totalCount).toSorted();
  const allBlueprints = [blueprintUnderTest, ...otherBlueprints];

  const [dwellerUnderTest, ...otherDwellers] = lengths
    .flatMap((n) => allBlueprints.slice(0, n).map(createAnyDweller))
    .map((dweller, i) => ({
      ...dweller,
      id: ids[i],
    }));

  return { dwellerUnderTest, otherDwellers };
};

export const createTrees = (blueprint: TreeCardBlueprint, count: number) =>
  Array(count)
    .fill(0)
    .map(() => createTree(blueprint));

export const addDwellersToTree = (tree: TreeCard, ...dwellers: DwellerCard[]) =>
  dwellers.reduce((tree, dweller) => {
    return {
      ...tree,
      dwellers: {
        ...tree.dwellers,
        [dweller.position]: [...tree.dwellers[dweller.position], dweller],
      },
    };
  }, tree);

export const createForestWith = ({
  trees = [],
  dwellers = [],
}: {
  trees?: TreeCard[];
  dwellers?: DwellerCard[];
}) => {
  for (const dweller of dwellers) {
    const tree = addDwellersToTree(
      trees.find((t) => t.dwellers[dweller.position].length === 0) ??
        createFakeTree(),
      dweller,
    );
    trees = [...trees.filter((t) => t.id !== tree.id), tree];
  }

  return {
    trees,
    caveCardCount: 0,
  };
};

export const createForestForTreeTest = ({
  treeUnderTest,
  otherTrees = [],
  dwellers = [],
}: {
  treeUnderTest: TreeCard;
  otherTrees?: TreeCard[];
  dwellers?: DwellerCard[];
}) => {
  const forest = createForestWith({
    trees: [treeUnderTest, ...otherTrees],
    dwellers,
  });

  return {
    forest,
    tree: forest.trees.find((t) => t.id === treeUnderTest.id)!,
  };
};

export const createForestForDwellerTest = ({
  dwellerUnderTest,
  treeUnderTest,
  otherDwellers = [],
  otherTrees = [],
}: {
  dwellerUnderTest: DwellerCard;
  treeUnderTest?: TreeCard;
  otherDwellers?: DwellerCard[];
  otherTrees?: TreeCard[];
}) => {
  if (!treeUnderTest) {
    [treeUnderTest, ...otherTrees] = otherTrees;
  }
  treeUnderTest = addDwellersToTree(
    treeUnderTest ?? createFakeTree(),
    dwellerUnderTest,
  );

  return {
    ...createForestForTreeTest({
      treeUnderTest,
      otherTrees,
      dwellers: otherDwellers,
    }),
    dweller: dwellerUnderTest,
  };
};

export function createCompleteForestWithDweller({
  dwellerUnderTest,
  filterDwellers = () => true,
  filterTrees = () => true,
}: {
  dwellerUnderTest: DwellerCard;
  filterDwellers?: (dweller: DwellerCard) => boolean;
  filterTrees?: (tree: TreeCard) => boolean;
}): { dweller: DwellerCard; tree: TreeCard; forest: Forest } {
  const dwellers = Object.values(Dwellers)
    .flatMap((b) => b.variants.map((v) => createDweller(b, v)))
    .filter(filterDwellers)
    .filter(
      (d) =>
        d.position !== dwellerUnderTest?.position ||
        d.treeSymbol !== dwellerUnderTest?.treeSymbol,
    );

  const trees = Object.values(Trees)
    .map((b) => createTree(b))
    .filter(filterTrees);

  return createForestForDwellerTest({
    dwellerUnderTest,
    otherDwellers: dwellers,
    otherTrees: trees,
  });
}

export const createGame: (...forests: Forest[]) => Game = (...forests) => ({
  id: generateId(),
  deck: {
    trees: [],
    dwellers: [],
  },
  players: forests.map((forest, i) => ({
    id: generateId(),
    name: `Player ${i}`,
    forest,
  })),
});
