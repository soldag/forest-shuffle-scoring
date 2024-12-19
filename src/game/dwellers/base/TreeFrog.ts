import { countCardNames } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import Gnat from "./Gnat";

const name = "TREE_FROG";
const gameBox = GameBox.Base;
const pointsPerGnat = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Amphibian],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Oak,
      count: 2,
    },
  ],
  score: ({ forest }) => countCardNames(forest, [Gnat.name]) * pointsPerGnat,
};

export default blueprint;
