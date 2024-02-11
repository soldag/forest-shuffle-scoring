import Beech from "../trees/Beech";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "CHAFFINCH";
const POINTS_ON_BEECH = 5;

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
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
  ],
  score: ({ tree }) => (tree.name === Beech.name ? POINTS_ON_BEECH : 0),
};

export default BLUEPRINT;
