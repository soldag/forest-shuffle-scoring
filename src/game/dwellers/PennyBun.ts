import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "PENNY_BUN";
const POINTS = 0;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Mushroom],
  modifiers: DEFAULT_MODIFIERS,
  cost: 2,
  count: 2,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 2,
    },
  ],
  score: () => POINTS,
};

export default BLUEPRINT;
