import { countCardNames } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";
import Gnat from "./Gnat";

const name = "TREE_FROG";
const pointsPerGnat = 5;

const blueprint: DwellerCardBlueprint = {
  name,
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
  score: ({ forest }) => countCardNames(forest, [Gnat.name]) * pointsPerGnat,
};

export default blueprint;
