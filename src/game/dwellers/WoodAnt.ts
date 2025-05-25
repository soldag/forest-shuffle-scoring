import { filterTrees } from "@/game/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "WOOD_ANT";
const gameBox = GameBox.Base;
const pointsPerBottomCard = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Insect],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 2,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    filterTrees(forest.woodyPlants).flatMap(
      (w) => w.dwellers[DwellerPosition.Bottom],
    ).length * pointsPerBottomCard,
};

export default blueprint;
