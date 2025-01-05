import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "KUCKUCK";
const points = 7;

// Promo card P010
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Bird],
  modifiers: {
    requiresSlotSharing: ({ dweller }) => dweller.types.includes(CardType.Bird),
  },
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
