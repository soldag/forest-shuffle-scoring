import * as _ from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import * as Dwellers from "./dwellers";
import {
  Deck,
  DwellerCard,
  DwellerCardBlueprint,
  DwellerPosition,
  DwellerVariant,
  Forest,
  Game,
  GameBox,
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
    countsAs: blueprint.countsAs,
    gameBox: variant.gameBox,
    types: blueprint.types.concat(variant.extraTypes ?? []),
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
    countsAs: blueprint.countsAs,
    gameBox: variant.gameBox,
    types: blueprint.types.concat(variant.extraTypes ?? []),
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

export const createDeck = (gameBoxes: GameBox[] = []): Deck => ({
  dwellers: Object.values(Dwellers).flatMap((blueprint) =>
    blueprint.variants
      .filter(({ count }) => isFinite(count))
      .filter(({ gameBox }) => gameBoxes.includes(gameBox))
      .flatMap((variant) =>
        _.times(variant.count, () => createDweller(blueprint, variant)),
      ),
  ),
  woodyPlants: Object.values(WoodyPlants).flatMap((blueprint) =>
    blueprint.variants
      .filter(({ count }) => isFinite(count))
      .filter(({ gameBox }) => gameBoxes.includes(gameBox))
      .flatMap((variant) =>
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

export const createGame = (gameBoxes: GameBox[]): Game => ({
  id: generateId(),
  deck: createDeck(gameBoxes),
  players: [],
});
