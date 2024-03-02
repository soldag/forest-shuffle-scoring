import { hasAllTreeSpecies } from "../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../types";

const NAME = "OAK";
const POINTS = 10;

const BLUEPRINT: TreeCardBlueprint = {
  name: NAME,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Oak,
  cost: 2,
  count: 7,
  isPartOfDeck: true,
  score: ({ forest }) => (hasAllTreeSpecies(forest) ? POINTS : 0),
};

export default BLUEPRINT;
