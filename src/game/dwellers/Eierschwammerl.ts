import { extendBlueprint } from "../blueprints";
import {
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";
import Chanterelle from "./Chanterelle";

const name = "EIERSCHWAMMERL";

// Promo card P010
const blueprint: DwellerCardBlueprint = extendBlueprint(Chanterelle, {
  name,
  variants: [
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
  ],
});

export default blueprint;
