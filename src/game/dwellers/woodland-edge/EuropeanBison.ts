import { countTreeSymbols } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "EUROPEAN_BISON";
const pointsPerBeechOrOak = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  cost: 3,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
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
