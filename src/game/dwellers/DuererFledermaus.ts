import { scoreBats } from "../scoring/bats";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "DUERER_FLEDERMAUS";

// Promo card P003
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Bat],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
  ],
  score: ({ forest }) => scoreBats(forest),
};

export default blueprint;
