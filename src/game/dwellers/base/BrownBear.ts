import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "BROWN_BEAR";
const gameBox = GameBox.Base;
const points = 0;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  cost: 3,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
