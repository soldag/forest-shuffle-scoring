import { countCardTypes } from "@/game/scoring/helpers";

import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "STINGING_NETTLE";
const gameBox = GameBox.WoodlandEdge;
const pointsByButterfly = 2;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Plant, CardType.WoodlandEdge],
  modifiers: {
    enablesSlotSharing: () => ({
      position: DwellerPosition.Top,
      type: CardType.Butterfly,
    }),
  },
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardTypes(forest, [CardType.Butterfly]) * pointsByButterfly,
};

export default blueprint;
