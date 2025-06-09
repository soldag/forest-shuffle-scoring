import { extendBlueprint } from "../blueprints";
import { GameBox, TreeSymbol, WoodyPlantCardBlueprint } from "../types";
import SilverFir from "./SilverFir";

const name = "OH_CHRISTMAS_TREE";

const blueprint: WoodyPlantCardBlueprint = extendBlueprint(SilverFir, {
  name,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
});

export default blueprint;
