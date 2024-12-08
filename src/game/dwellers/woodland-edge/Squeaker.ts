import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "SQUEAKER";
const points = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.ClovenhoofedAnimal, CardType.WoodlandEdge],
  cost: 0,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
