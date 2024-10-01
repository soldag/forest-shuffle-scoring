import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { Beech } from "../../woody-plants";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "CHAFFINCH";
const pointsOnBeech = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Bird],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 4,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
  ],
  score: ({ woodyPlant }) =>
    woodyPlant.name === Beech.name ? pointsOnBeech : 0,
};

export default blueprint;
