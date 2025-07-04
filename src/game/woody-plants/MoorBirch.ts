import { extendBlueprint } from "../blueprints";
import { GameBox, TreeSymbol, WoodyPlantCardBlueprint } from "../types";
import Birch from "./Birch";

const name = "MOOR_BIRCH";

// Promo card P001
const blueprint: WoodyPlantCardBlueprint = extendBlueprint(Birch, {
  name,
  variants: [
    {
      gameBox: GameBox.Exploration,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
});

export default blueprint;
