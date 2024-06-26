import { countTreeSpecies } from "../../scoring/helpers";
import { CardType, TreeCardBlueprint, TreeSymbol } from "../../types";

const name = "OAK";
const points = 10;
const minTreeSpeciesCount = 8;

const blueprint: TreeCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.Oak,
  cost: 2,
  count: 7,
  isPartOfDeck: true,
  score: ({ forest }) =>
    countTreeSpecies(forest) < minTreeSpeciesCount ? 0 : points,
};

export default blueprint;
