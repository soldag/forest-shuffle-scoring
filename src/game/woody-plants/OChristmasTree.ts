import { extendBlueprint } from "../blueprints";
import { GameBox, TreeSymbol, WoodyPlantCardBlueprint } from "../types";
import SilverFir from "./SilverFir";

const name = "O_CHRISTMAS_TREE";

// Promo card P015
const blueprint: WoodyPlantCardBlueprint = extendBlueprint(SilverFir, {
  name,
  variants: [
    {
      gameBox: GameBox.Exploration,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
});

export default blueprint;
