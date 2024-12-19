import { countCardTypes, scoreByCount } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../../types";

const name = "DIGITALIS";
const pointsByDistinctPlantsCount = {
  1: 1,
  2: 3,
  3: 6,
  4: 10,
  5: 15,
};

const blueprint: DwellerCardBlueprint = {
  name,
  gameBox: GameBox.WoodlandEdge,
  types: [CardType.Plant, CardType.WoodlandEdge],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest }) => {
    const count = countCardTypes(forest, [CardType.Plant], true);
    return scoreByCount(count, pointsByDistinctPlantsCount);
  },
};

export default blueprint;
