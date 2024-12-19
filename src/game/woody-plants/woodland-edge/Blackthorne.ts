import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "BLACKTHORNE";
const points = 0;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.Shrub, CardType.WoodlandEdge],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
