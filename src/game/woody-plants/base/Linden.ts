import { scoreByCardMajority } from "../../scoring/helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "LINDEN";
const count = 9;
const pointsMinority = 1;
const pointsMajority = 3;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 1,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Linden,
      count,
    },
  ],
  score: ({ game, forest }) =>
    scoreByCardMajority(game, forest, pointsMinority, pointsMajority, {
      names: [name],
    }),
};

export default blueprint;
