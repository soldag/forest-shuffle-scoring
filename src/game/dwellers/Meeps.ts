import {
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";
import EuropeanWildcat from "./EuropeanWildcat";

const name = "MEEPS";

// Promo card P013
const blueprint: DwellerCardBlueprint = {
  ...EuropeanWildcat,
  name,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
  ],
};

export default blueprint;
