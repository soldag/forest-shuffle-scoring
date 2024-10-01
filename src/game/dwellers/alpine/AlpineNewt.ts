import { countCardTypes } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "ALPINE_NEWT";
const pointsPerInsect = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Alpine,
  types: [CardType.Alps, CardType.Amphibian],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SwissPine,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Insect]) * pointsPerInsect,
};

export default blueprint;
