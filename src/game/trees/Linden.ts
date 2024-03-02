import { scoreByCardMajority } from "../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const NAME = "LINDEN";
const POINTS_MINORITY = 1;
const POINTS_MAJORITY = 3;

const BLUEPRINT: TreeCardBlueprint = {
  name: NAME,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Linden,
  cost: 1,
  count: 9,
  isPartOfDeck: true,
  score: ({ game, forest }) =>
    scoreByCardMajority(game, forest, POINTS_MINORITY, POINTS_MAJORITY, {
      names: [NAME],
    }),
};

export default BLUEPRINT;
