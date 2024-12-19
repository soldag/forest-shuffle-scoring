import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "COMMON_TOAD";
const gameBox = GameBox.Base;
const pointsIfPaired = 5;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.Amphibian],
  modifiers: {
    allowsSlotSharing: (context, dwellerToAdd) =>
      context.dweller.name === dwellerToAdd.name &&
      context.dweller.position === dwellerToAdd.position &&
      context.woodyPlant.dwellers[dwellerToAdd.position].length < 2,
  },
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Beech,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.DouglasFir,
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
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Bottom,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
  ],
  score: ({ woodyPlant }) => {
    const bottomDwellers = woodyPlant.dwellers[DwellerPosition.Bottom];
    return bottomDwellers.filter((c) => c.name === name).length > 1
      ? pointsIfPaired
      : 0;
  },
};

export default blueprint;
