import { extendBlueprint } from "../blueprints";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";
import Fireflies from "./Fireflies";

const name = "SAYS_FIREFLY";

// Promo card P008
const blueprint: DwellerCardBlueprint = extendBlueprint(Fireflies, {
  name,
  types: [CardType.Insect, CardType.WoodlandEdge],
  variants: [
    {
      gameBox: GameBox.Exploration,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
  ],
});

export default blueprint;
