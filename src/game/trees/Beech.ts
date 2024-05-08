import { countCardNames } from "../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const name = "BEECH";
const minCount = 4;
const pointsPerCard = 5;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Beech,
  cost: 1,
  count: 10,
  isPartOfDeck: true,
  score: ({ forest }) => {
    return countCardNames(forest, [name]) >= minCount ? pointsPerCard : 0;
  },
};

export default blueprint;
