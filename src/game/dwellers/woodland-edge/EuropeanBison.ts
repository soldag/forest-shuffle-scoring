import { countTreeSymbols } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "EUROPEAN_BISON";
const gameBox = GameBox.WoodlandEdge;
const pointsPerBeechOrOak = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  cost: 3,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countTreeSymbols(forest, [TreeSymbol.Beech, TreeSymbol.Oak]) *
    pointsPerBeechOrOak,
};

export default blueprint;
