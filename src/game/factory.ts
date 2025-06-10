import * as _ from "lodash-es";
import { v4 as uuidv4 } from "uuid";

import * as Caves from "./caves";
import * as Dwellers from "./dwellers";
import {
  Cave,
  CaveBlueprint,
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

export const createCave = (
  blueprint: CaveBlueprint,
  cardCount: number = 0,
): Cave => ({
  id: generateId(),
  name: blueprint.name,
  gameBox: blueprint.gameBox,
  cardCount,
});

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

export const createForest = (cave: Cave): Forest => ({
  woodyPlants: [],
  cave,
});

export const createDeck = (gameBoxes: GameBox[] = []): Deck => ({
  caves: Object.values(Caves)
    .filter(({ count }) => isFinite(count))
    .filter(({ gameBox }) => gameBoxes.includes(gameBox))
    .flatMap((blueprint) =>
      _.times(blueprint.count, () => createCave(blueprint)),
    ),
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

export const createPlayer = (name: string, cave: Cave): Player => ({
  id: generateId(),
  name,
  forest: createForest(cave),
});

export const createGame = (gameBoxes: GameBox[]): Game => ({
  id: generateId(),
  gameBoxes,
  deck: createDeck(gameBoxes),
  players: [],
});
