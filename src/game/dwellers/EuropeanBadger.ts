import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "EUROPEAN_BADGER";
const gameBox = GameBox.Base;
const points = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 2,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 2,
    },
    // Promo card P009
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
