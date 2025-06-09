import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "MISTLETOE";
const pointsPerPlant = 1;

// Promo card P012
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Linden,
      extraTypes: [CardType.WoodlandEdge],
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Plant]) * pointsPerPlant,
};

export default blueprint;
