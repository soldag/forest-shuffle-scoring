import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "RED_DEER";
const POINTS_PER_TREE_OR_PLANT = 1;

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
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 2,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Tree, CardType.Plant]) *
    POINTS_PER_TREE_OR_PLANT,
};

export default BLUEPRINT;
