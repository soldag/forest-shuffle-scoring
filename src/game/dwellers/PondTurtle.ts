import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "POND_TURTLE";
const POINTS = 5;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Amphibian],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 2,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: () => POINTS,
};

export default BLUEPRINT;
