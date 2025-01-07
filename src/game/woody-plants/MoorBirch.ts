import { GameBox, TreeSymbol, WoodyPlantCardBlueprint } from "../types";
import Birch from "./Birch";

const name = "MOOR_BIRCH";

// Promo card P001
const blueprint: WoodyPlantCardBlueprint = {
  ...Birch,
  name,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
};

export default blueprint;
