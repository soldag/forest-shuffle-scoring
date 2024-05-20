import { scoreByCardMajority } from "../../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "LINDEN";
const pointsMinority = 1;
const pointsMajority = 3;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Linden,
  cost: 1,
  count: 9,
  isPartOfDeck: true,
  score: ({ game, forest }) =>
    scoreByCardMajority(game, forest, pointsMinority, pointsMajority, {
      names: [name],
    }),
};

export default blueprint;
