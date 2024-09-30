import { countCardNames } from "../../scoring/helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "BEECH";
const count = 10;
const minCount = 4;
const pointsPerCard = 5;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 1,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Beech,
      count,
    },
  ],
  score: ({ forest }) => {
    return countCardNames(forest, [name]) >= minCount ? pointsPerCard : 0;
  },
};

export default blueprint;
