import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "ROBBER";
const points = 7;

// Promo card P022
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Person],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
