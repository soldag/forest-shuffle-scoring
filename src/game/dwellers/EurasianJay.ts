import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "EURASIAN_JAY";
const POINTS = 3;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Bird],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Birch,
      count: 2,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: () => POINTS,
};

export default BLUEPRINT;
