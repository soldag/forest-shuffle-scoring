import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "EIERSCHWAMMERL";
const points = 0;

// Promo card P010
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Mushroom],
  cost: 2,
  isPartOfDeck: true,
  variants: [
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
