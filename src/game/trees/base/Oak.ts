import { hasAllTreeSpecies } from "../../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "OAK";
const points = 10;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Oak,
  cost: 2,
  count: 7,
  isPartOfDeck: true,
  score: ({ forest }) => (hasAllTreeSpecies(forest) ? points : 0),
};

export default blueprint;
