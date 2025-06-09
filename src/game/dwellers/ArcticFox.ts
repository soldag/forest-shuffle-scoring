import { extendBlueprint } from "../blueprints";
import {
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";
import RedFox from "./RedFox";

const name = "ARCTIC_FOX";
const gameBox = GameBox.Exploration;

// Promo card P016
const blueprint: DwellerCardBlueprint = extendBlueprint(RedFox, {
  name,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
});

export default blueprint;
