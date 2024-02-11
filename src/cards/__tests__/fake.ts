import { DEFAULT_MODIFIERS } from "@/cards/dwellers/modifiers";
import { generateId } from "@/cards/factory";
import {
  CardType,
  DwellerCard,
  DwellerModifiers,
  DwellerPosition,
  TreeCard,
  TreeSymbol,
} from "@/cards/types";

interface FakeDwellerOptionalArgs {
  id?: string;
  types?: CardType[];
  treeSymbol?: TreeSymbol;
  modifiers?: DwellerModifiers;
  isPartOfDeck?: boolean;
}

interface FakeTreeOptionalArgs {
  treeSymbol?: TreeSymbol;
  isPartOfDeck?: boolean;
}

export const createFakeDweller: (
  position: DwellerPosition,
  optionalArgs?: FakeDwellerOptionalArgs,
) => DwellerCard = (
  position,
  {
    id,
    types = [CardType.Amphibian],
    treeSymbol,
    modifiers = DEFAULT_MODIFIERS,
    isPartOfDeck = true,
  } = {},
) => ({
  id: id ?? generateId(),
  name: "FAKE_DWELLER",
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

export const createFakeTree: (
  optionalArgs?: FakeTreeOptionalArgs,
) => TreeCard = ({ treeSymbol, isPartOfDeck = true } = {}) => ({
  id: generateId(),
  name: "FAKE_TREE",
  types: [CardType.Tree],
  treeSymbol,
  isPartOfDeck,
  dwellers: {
    [DwellerPosition.Top]: [],
    [DwellerPosition.Bottom]: [],
    [DwellerPosition.Left]: [],
    [DwellerPosition.Right]: [],
  },
});

export const createFakeTrees: (
  count: number,
  optionalArgs?: FakeTreeOptionalArgs,
) => TreeCard[] = (count, args) =>
  Array(count)
    .fill(0)
    .map(() => createFakeTree(args));
