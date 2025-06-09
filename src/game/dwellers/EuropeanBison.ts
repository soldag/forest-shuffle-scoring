import { countTreeSymbols } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "EUROPEAN_BISON";
const pointsPerBeechOrOak = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  cost: 3,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    // Promo card P007
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countTreeSymbols(forest, [TreeSymbol.Beech, TreeSymbol.Oak]) *
    pointsPerBeechOrOak,
};

export default blueprint;
