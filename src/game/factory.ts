import * as _ from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import * as Dwellers from "./dwellers";
import * as Trees from "./trees";
import { Sapling } from "./trees";
import {
  CardType,
  Deck,
  DwellerCard,
  DwellerCardBlueprint,
  DwellerPosition,
  DwellerVariant,
  Expansion,
  Forest,
  Game,
  Player,
  TreeCard,
  TreeCardBlueprint,
} from "./types";

export const generateId = () => uuidv4();

export const createDweller = (
  blueprint: DwellerCardBlueprint,
  variant: DwellerVariant,
): DwellerCard => {
  if (blueprint.types.some((t) => t === CardType.Tree)) {
    throw new TypeError("The blueprint must not be a tree blueprint");
  }
  if (!blueprint.variants.includes(variant)) {
    throw new TypeError("The variant is invalid");
  }

  const dweller: DwellerCard = {
    id: generateId(),
    name: blueprint.name,
    types: blueprint.types,
    treeSymbol: variant.treeSymbol,
    isPartOfDeck: blueprint.isPartOfDeck,
    position: variant.position,
    modifiers: blueprint.modifiers,
  };

  return dweller;
};

export const createTree = (blueprint: TreeCardBlueprint): TreeCard => {
  if (blueprint.types.every((t) => t !== CardType.Tree)) {
    throw new TypeError("The blueprint must be a tree blueprint");
  }

  const tree: TreeCard = {
    id: generateId(),
    name: blueprint.name,
    types: blueprint.types,
    treeSymbol: blueprint.treeSymbol,
    isPartOfDeck: blueprint.isPartOfDeck,
    dwellers: {
      [DwellerPosition.Top]: [],
      [DwellerPosition.Bottom]: [],
      [DwellerPosition.Left]: [],
      [DwellerPosition.Right]: [],
    },
  };

  return tree;
};

export const createSapling = (): TreeCard => createTree(Sapling);

export const createForest = (caveCardCount: number = 0): Forest => ({
  trees: [],
  caveCardCount,
});

export const createDeck = (expansions: Expansion[] = []): Deck => ({
  dwellers: Object.values(Dwellers)
    .filter(({ expansion }) => !expansion || expansions.includes(expansion))
    .flatMap((blueprint) =>
      blueprint.variants.flatMap((variant) =>
        _.times(variant.count, () => createDweller(blueprint, variant)),
      ),
    ),
  trees: Object.values(Trees)
    .filter((blueprint) => isFinite(blueprint.count))
    .filter(({ expansion }) => !expansion || expansions.includes(expansion))
    .flatMap((blueprint) =>
      _.times(blueprint.count, () => createTree(blueprint)),
    ),
});

export const createPlayer = (
  name: string,
  caveCardCount: number = 0,
): Player => ({
  id: generateId(),
  name,
  forest: createForest(caveCardCount),
});

export const createGame = (expansions?: Expansion[]): Game => ({
  id: generateId(),
  deck: createDeck(expansions),
  players: [],
});
