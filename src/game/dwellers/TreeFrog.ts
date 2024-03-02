import { countCardNames } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import Gnat from "./Gnat";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "TREE_FROG";
const POINTS_PER_GNAT = 5;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Amphibian],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Oak,
      count: 2,
    },
  ],
  score: ({ forest }) => countCardNames(forest, [Gnat.name]) * POINTS_PER_GNAT,
};

export default BLUEPRINT;
