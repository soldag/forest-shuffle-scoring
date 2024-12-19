import { scoreBats } from "../../scoring/bats";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "GREATER_HORSESHOE_BAT";
const gameBox = GameBox.Base;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Bat],
  cost: 1,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Linden,
      count: 2,
    },
  ],
  score: ({ forest }) => scoreBats(forest),
};

export default blueprint;
