import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../types";

const name = "BLACKTHORNE";
const gameBox = GameBox.WoodlandEdge;
const points = 0;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Shrub, CardType.WoodlandEdge],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
