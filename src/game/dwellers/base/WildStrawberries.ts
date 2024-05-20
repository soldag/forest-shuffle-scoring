import { hasAllTreeSpecies } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "WILD_STRAWBERRIES";
const points = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 3,
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
      count: 2,
    },
  ],
  score: ({ forest }) => (hasAllTreeSpecies(forest) ? points : 0),
};

export default blueprint;
