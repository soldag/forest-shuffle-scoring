import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "NIGHTINGALE";
const gameBox = GameBox.WoodlandEdge;
const pointsOnShrub = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Bird, CardType.WoodlandEdge],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ woodyPlant }) =>
    woodyPlant.types.includes(CardType.Shrub) ? pointsOnShrub : 0,
};

export default blueprint;
