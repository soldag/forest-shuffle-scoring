import { countTreeSymbols } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "ROE_DEER";
const POINTS_PER_TREE_SYMBOL = 3;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.ClovenhoofedAnimal, CardType.Deer],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 5,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) =>
    dweller.treeSymbol
      ? countTreeSymbols(forest, [dweller.treeSymbol]) * POINTS_PER_TREE_SYMBOL
      : 0,
};

export default BLUEPRINT;
