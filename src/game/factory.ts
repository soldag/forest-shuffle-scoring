import * as _ from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import * as Dwellers from "./dwellers";
import {
  Deck,
  DwellerCard,
  DwellerCardBlueprint,
  DwellerPosition,
  DwellerVariant,
  Expansion,
  Forest,
  Game,
  Player,
  WoodyPlantCard,
  WoodyPlantCardBlueprint,
  WoodyPlantVariant,
} from "./types";
import * as WoodyPlants from "./woody-plants";
import { Sapling } from "./woody-plants";

export const generateId = () => uuidv4();

export const createDweller = (
  blueprint: DwellerCardBlueprint,
  variant: DwellerVariant,
): DwellerCard => {
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

export const createWoodyPlant = (
  blueprint: WoodyPlantCardBlueprint,
  variant: WoodyPlantVariant,
): WoodyPlantCard => {
  if (!blueprint.variants.includes(variant)) {
    throw new TypeError("The variant is invalid");
  }

  const woodyPlant: WoodyPlantCard = {
    id: generateId(),
    name: blueprint.name,
    types: blueprint.types,
    treeSymbol: variant.treeSymbol,
    isPartOfDeck: blueprint.isPartOfDeck,
    dwellers: {
      [DwellerPosition.Top]: [],
      [DwellerPosition.Bottom]: [],
      [DwellerPosition.Left]: [],
      [DwellerPosition.Right]: [],
    },
  };

  return woodyPlant;
};

export const createSapling = (): WoodyPlantCard =>
  createWoodyPlant(Sapling, Sapling.variants[0]);

export const createForest = (caveCardCount: number = 0): Forest => ({
  woodyPlants: [],
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
  woodyPlants: Object.values(WoodyPlants)
    .filter((blueprint) => isFinite(blueprint.count))
    .filter(({ expansion }) => !expansion || expansions.includes(expansion))
    .flatMap((blueprint) =>
      blueprint.variants.flatMap((variant) =>
        _.times(variant.count, () => createWoodyPlant(blueprint, variant)),
      ),
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
