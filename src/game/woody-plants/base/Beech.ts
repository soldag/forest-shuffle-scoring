import { countCardNames } from "../../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "BEECH";
const minCount = 4;
const pointsPerCard = 5;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      treeSymbol: TreeSymbol.Beech,
      count: 10,
    },
  ],
  score: ({ forest }) => {
    return countCardNames(forest, [name]) >= minCount ? pointsPerCard : 0;
  },
};

export default blueprint;
