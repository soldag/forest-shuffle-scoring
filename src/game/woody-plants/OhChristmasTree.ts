import { GameBox, TreeSymbol, WoodyPlantCardBlueprint } from "../types";
import SilverFir from "./SilverFir";

const name = "OH_CHRISTMAS_TREE";

const blueprint: WoodyPlantCardBlueprint = {
  ...SilverFir,
  name,
  variants: [
    {
      gameBox: GameBox.PromoCards,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
  ],
};

export default blueprint;
