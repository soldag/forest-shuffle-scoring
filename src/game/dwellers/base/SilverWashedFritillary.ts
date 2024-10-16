import { scoreButterflies } from "../../scoring/butterflies";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "SILVER_WASHED_FRITILLARY";

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Base,
  types: [CardType.Butterfly, CardType.Insect],
  modifiers: DEFAULT_MODIFIERS,
  cost: 0,
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
      treeSymbol: TreeSymbol.Oak,
      count: 3,
    },
  ],
  score: ({ forest, dweller }) => scoreButterflies(forest, dweller),
};

export default blueprint;
