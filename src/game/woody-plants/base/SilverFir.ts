import { getDwellersOfWoodyPlant } from "../../helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "SILVER_FIR";
const pointsPerDweller = 2;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  treeSymbol: TreeSymbol.SilverFir,
  cost: 2,
  count: 6,
  isPartOfDeck: true,
  score: ({ woodyPlant }) =>
    getDwellersOfWoodyPlant(woodyPlant).length * pointsPerDweller,
};

export default blueprint;
