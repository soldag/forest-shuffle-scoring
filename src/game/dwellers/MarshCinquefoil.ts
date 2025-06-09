import { countCards, scoreByCount } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "MARSH_CINQUEFOIL";
const gameBox = GameBox.Exploration;
const pointsByTreeCount = {
  0: 15,
  6: 7,
  11: 3,
};

// Promo card P028
const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant, CardType.Swamp],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.EuropeanAlder,
      count: 1,
    },
  ],
  score: ({ forest }) => {
    const treeCount = countCards(forest, { types: [CardType.Tree] });
    return scoreByCount(treeCount, pointsByTreeCount);
  },
};

export default blueprint;
