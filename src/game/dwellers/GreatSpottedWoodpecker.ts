import { scoreByCardMajority } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "GREAT_SPOTTED_WOODPECKER";
const gameBox = GameBox.Base;
const pointsMinority = 0;
const pointsMajority = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Bird],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Linden,
      count: 3,
    },
  ],
  score: ({ game, forest }) =>
    scoreByCardMajority(game, forest, pointsMinority, pointsMajority, {
      types: [CardType.Tree],
    }),
};

export default blueprint;
