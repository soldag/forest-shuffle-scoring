import { countCardTypes } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  Expansion,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "ENZIAN";
const pointsPerButterfly = 3;

const blueprint: DwellerCardBlueprint = {
  name,
  expansion: Expansion.Alpine,
  types: [CardType.Alps, CardType.Plant],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SwissPine,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Butterfly]) * pointsPerButterfly,
};

export default blueprint;
