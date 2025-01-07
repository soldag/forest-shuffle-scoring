import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "WATER_VOLE";
const points = 0;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal, CardType.WoodlandEdge],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    // Promo card P006
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
