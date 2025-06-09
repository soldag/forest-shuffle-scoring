import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "RED_PANDA";
const gameBox = GameBox.Exploration;
const points = 2;

// Promo card P005
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Bamboo,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
