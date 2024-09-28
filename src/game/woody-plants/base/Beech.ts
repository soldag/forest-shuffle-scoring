import { countCardNames } from "../../scoring/helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "BEECH";
const minCount = 4;
const pointsPerCard = 5;

const blueprint: WoodyPlantCardBlueprint = {
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
