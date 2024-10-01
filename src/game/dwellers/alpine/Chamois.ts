import { countTreeSymbols } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";
import { DEFAULT_MODIFIERS } from "../modifiers";

const name = "CHAMOIS";
const pointsPerTreeSymbol = 3;

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.Alpine,
  types: [CardType.Alps, CardType.ClovenhoofedAnimal],
  modifiers: DEFAULT_MODIFIERS,
  cost: 1,
  count: 3,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.AlpineLarch,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SwissPine,
      count: 1,
    },
  ],
  score: ({ forest, dweller }) =>
    dweller.treeSymbol
      ? countTreeSymbols(forest, [dweller.treeSymbol]) * pointsPerTreeSymbol
      : 0,
};

export default blueprint;
