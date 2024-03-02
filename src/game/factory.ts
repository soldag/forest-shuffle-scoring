import { v4 as uuidv4 } from "uuid";

import * as Dwellers from "./dwellers";
import * as Trees from "./trees";
import SaplingBlueprint from "./trees/Sapling";
import {
  CardType,
  Deck,
  DwellerCard,
  DwellerCardBlueprint,
  DwellerPosition,
  DwellerVariant,
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
  if (blueprint.types.some((t) => t !== CardType.Tree)) {
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

export const createSapling = (): TreeCard => createTree(SaplingBlueprint);

export const createForest = (): Forest => ({
  trees: [],
  cave: [],
});

export const createDeck = (): Deck => ({
  dwellers: Object.values(Dwellers).flatMap((blueprint) =>
    blueprint.variants.flatMap((variant) =>
      Array(variant.count).fill(createDweller(blueprint, variant)),
    ),
  ),
  trees: Object.values(Trees)
    .filter((blueprint) => isFinite(blueprint.count))
    .flatMap((blueprint) =>
      Array.from(Array(blueprint.count)).map(() => createTree(blueprint)),
    ),
});

export const createPlayer = (name: string): Player => ({
  id: generateId(),
  name,
  forest: createForest(),
});

export const createGame = (): Game => ({
  deck: createDeck(),
  players: [],
});
