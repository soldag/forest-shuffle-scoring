import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "BEARDED_VULTURE";
const pointsPerCaveCard = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Alpine,
  types: [CardType.Alps, CardType.Bird],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Top,
      treeSymbol: TreeSymbol.SwissPine,
      count: 1,
    },
  ],
  score: ({ forest }) => forest.caveCardCount * pointsPerCaveCard,
};

export default blueprint;
