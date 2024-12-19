import { getDwellersOfWoodyPlant } from "../../helpers";
import {
  CardType,
  GameBox,
  TreeSymbol,
  WoodyPlantCardBlueprint,
} from "../../types";

const name = "SILVER_FIR";
const pointsPerDweller = 2;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Tree],
  cost: 2,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.SilverFir,
      count: 6,
    },
  ],
  score: ({ woodyPlant }) =>
    getDwellersOfWoodyPlant(woodyPlant).length * pointsPerDweller,
};

export default blueprint;
