import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "VIOLET_CARPENTER_BEE";
const points = 0;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Insect],
  modifiers: { ...DEFAULT_MODIFIERS, treeCount: 1 },
  cost: 1,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 2,
    },
  ],
  score: () => points,
};

export default blueprint;
