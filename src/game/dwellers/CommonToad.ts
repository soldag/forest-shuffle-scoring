import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "COMMON_TOAD";
const POINTS_IF_PAIRED = 5;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Amphibian],
  modifiers: {
    ...DEFAULT_MODIFIERS,
    sharesSlotWith: 1,
  },
  cost: 0,
  count: 6,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ tree }) => {
    const bottomDwellers = tree.dwellers[DwellerPosition.Bottom];
    return bottomDwellers.filter((c) => c.name === NAME).length > 1
      ? POINTS_IF_PAIRED
      : 0;
  },
};

export default BLUEPRINT;
