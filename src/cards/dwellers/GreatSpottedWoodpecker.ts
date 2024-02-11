import { scoreByCardMajority } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  TreeSymbol,
} from "../types";
import { DEFAULT_MODIFIERS } from "./modifiers";

const NAME = "GREAT_SPOTTED_WOODPECKER";
const POINTS_MINORITY = 0;
const POINTS_MAJORITY = 10;

const BLUEPRINT: DwellerCardBlueprint = {
  name: NAME,
  types: [CardType.Bird],
  modifiers: DEFAULT_MODIFIERS,
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
    scoreByCardMajority(game, forest, POINTS_MINORITY, POINTS_MAJORITY, {
      types: [CardType.Tree],
    }),
};

export default BLUEPRINT;
