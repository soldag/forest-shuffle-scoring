import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "VIOLET_CARPENTER_BEE";
const POINTS = 0;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Insect],
  modifiers: { ...DEFAULT_MODIFIERS, treeCount: 1 },
  cost: 1,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 2,
    },
  ],
  score: () => POINTS,
};

export default BLUEPRINT;
