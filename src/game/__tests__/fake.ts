import { generateId } from "@/game/factory";
import {
  CardType,
  DwellerCard,
  DwellerModifiers,
  DwellerPosition,
  GameBox,
  TreeSymbol,
  WoodyPlantCard,
} from "@/game/types";

interface FakeDwellerOptionalArgs {
  id?: string;
  gameBox?: GameBox;
  types?: CardType[];
  treeSymbol?: TreeSymbol;
  modifiers?: DwellerModifiers;
  isPartOfDeck?: boolean;
  uniqueName?: boolean;
}

interface FakeWoodyPlantOptionalArgs {
  gameBox?: GameBox;
  types?: CardType[];
  treeSymbol?: TreeSymbol;
  isPartOfDeck?: boolean;
  uniqueName?: boolean;
}

const getFakeName = (type: "dweller" | "woodyPlant", unique: boolean) => {
  let name = `FAKE_${type.toUpperCase()}`;
  if (unique) {
    name += `_${generateId()}`;
  }

  return name;
};

export const createFakeDweller: (
  position: DwellerPosition,
  optionalArgs?: FakeDwellerOptionalArgs,
) => DwellerCard = (
  position,
  {
    id,
    gameBox = GameBox.Base,
    types = [CardType.Amphibian],
    treeSymbol,
    modifiers,
    isPartOfDeck = true,
    uniqueName = true,
  } = {},
) => ({
  id: id ?? generateId(),
  name: getFakeName("dweller", uniqueName),
  gameBox,
  types,
  treeSymbol,
  position,
  modifiers,
  isPartOfDeck,
});

export const createFakeDwellers: (
  count: number,
  position: DwellerPosition,
  optionalArgs?: FakeDwellerOptionalArgs,
) => DwellerCard[] = (count, position, optionalArgs) =>
  Array(count)
    .fill(0)
    .map(() => createFakeDweller(position, optionalArgs));

export const createFakeWoodyPlant: (
  optionalArgs?: FakeWoodyPlantOptionalArgs,
) => WoodyPlantCard = ({
  gameBox = GameBox.Base,
  types = [CardType.Tree],
  treeSymbol,
  isPartOfDeck = true,
  uniqueName = true,
} = {}) => ({
  id: generateId(),
  name: getFakeName("woodyPlant", uniqueName),
  gameBox,
  types,
  treeSymbol,
  isPartOfDeck,
  dwellers: {
    [DwellerPosition.Top]: [],
    [DwellerPosition.Bottom]: [],
    [DwellerPosition.Left]: [],
    [DwellerPosition.Right]: [],
  },
});

export const createFakeWoodyPlants: (
  count: number,
  optionalArgs?: FakeWoodyPlantOptionalArgs,
) => WoodyPlantCard[] = (count, args) =>
  Array(count)
    .fill(0)
    .map(() => createFakeWoodyPlant(args));
