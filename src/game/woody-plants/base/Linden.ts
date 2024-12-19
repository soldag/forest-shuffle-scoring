import { scoreByCardMajority } from "../../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "LINDEN";
const pointsMinority = 1;
const pointsMajority = 3;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      treeSymbol: TreeSymbol.Linden,
      count: 9,
    },
  ],
  score: ({ game, forest }) =>
    scoreByCardMajority(game, forest, pointsMinority, pointsMajority, {
      names: [name],
    }),
};

export default blueprint;
