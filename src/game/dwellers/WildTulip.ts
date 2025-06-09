import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "WILD_TULIP";
const points = 3;

// Promo card P012
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant, CardType.WoodlandEdge],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
