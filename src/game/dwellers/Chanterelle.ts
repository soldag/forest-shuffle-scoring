import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "CHANTERELLE";
const gameBox = GameBox.Base;
const points = 0;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Mushroom],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    // Promo card P010
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
