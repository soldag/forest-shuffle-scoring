import { countTreeSpecies } from "../../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "OAK";
const points = 10;
const minTreeSpeciesCount = 8;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      treeSymbol: TreeSymbol.Oak,
      count: 7,
    },
  ],
  score: ({ forest }) =>
    countTreeSpecies(forest) < minTreeSpeciesCount ? 0 : points,
};

export default blueprint;
