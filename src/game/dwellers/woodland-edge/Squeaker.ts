import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "SQUEAKER";
const gameBox = GameBox.WoodlandEdge;
const points = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
