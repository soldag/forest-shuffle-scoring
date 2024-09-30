import { getDwellersOfWoodyPlant } from "../../helpers";
import { CardType, TreeSymbol, WoodyPlantCardBlueprint } from "../../types";

const name = "SILVER_FIR";
const count = 6;
const pointsPerDweller = 2;

const blueprint: WoodyPlantCardBlueprint = {
  name,
  types: [CardType.Tree],
  cost: 2,
  count,
  isPartOfDeck: true,
  variants: [
    {
      treeSymbol: TreeSymbol.SilverFir,
      count,
    },
  ],
  score: ({ woodyPlant }) =>
    getDwellersOfWoodyPlant(woodyPlant).length * pointsPerDweller,
};

export default blueprint;
