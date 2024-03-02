import { countCardNames } from "../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const NAME = "BEECH";
const MIN_COUNT = 4;
const POINTS_PER_CARD = 5;

const BLUEPRINT: TreeCardBlueprint = {
  name: NAME,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Beech,
  cost: 1,
  count: 10,
  isPartOfDeck: true,
  score: ({ forest }) => {
    return countCardNames(forest, [NAME]) >= MIN_COUNT ? POINTS_PER_CARD : 0;
  },
};

export default BLUEPRINT;
