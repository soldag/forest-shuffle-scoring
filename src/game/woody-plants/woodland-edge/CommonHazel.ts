import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "COMMON_HAZEL";
const points = 0;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.Shrub, CardType.WoodlandEdge],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
