import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "NIGHTINGALE";
const pointsOnShrub = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.Bird, CardType.WoodlandEdge],
  cost: 1,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ woodyPlant }) =>
    woodyPlant.types.includes(CardType.Shrub) ? pointsOnShrub : 0,
};

export default blueprint;
