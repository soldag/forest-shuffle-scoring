import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  Expansion,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "COMMON_RAVEN";
const points = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  expansion: Expansion.Alpine,
  types: [CardType.Alps, CardType.Bird],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 2,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
