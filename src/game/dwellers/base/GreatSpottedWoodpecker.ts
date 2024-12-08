import { scoreByCardMajority } from "../../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "GREAT_SPOTTED_WOODPECKER";
const pointsMinority = 0;
const pointsMajority = 10;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Bird],
  cost: 1,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
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
