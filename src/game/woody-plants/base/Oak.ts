import { countTreeSpecies } from "../../scoring/helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "OAK";
const count = 7;
const points = 10;
const minTreeSpeciesCount = 8;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 2,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.Oak,
      count,
    },
  ],
  score: ({ forest }) =>
    countTreeSpecies(forest) < minTreeSpeciesCount ? 0 : points,
};

export default blueprint;
