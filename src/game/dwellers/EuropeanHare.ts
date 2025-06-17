import { MountainHare } from "@/game/dwellers";

import { countCardNames } from "../scoring/helpers";
import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "EUROPEAN_HARE";
const gameBox = GameBox.Base;
const pointsPerCard = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  modifiers: {
    enablesSlotSharing: ({ dweller }) => ({
      position: dweller.position,
      name,
    }),
  },
  cost: 0,
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
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Birch,
      count: 2,
    },
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Birch,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Linden,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 2,
    },
    // Promo card P003
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
  ],
  score: ({ forest }) =>
    countCardNames(forest, [name, MountainHare.name]) * pointsPerCard,
};

export default blueprint;
