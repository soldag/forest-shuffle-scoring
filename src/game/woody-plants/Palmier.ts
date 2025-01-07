import { countCardTypes } from "../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../types";

const name = "PALMIER";
const pointsPerBird = 1;

// Promo card P004
const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.GoldenPalm,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Bird]) * pointsPerBird,
};

export default blueprint;
