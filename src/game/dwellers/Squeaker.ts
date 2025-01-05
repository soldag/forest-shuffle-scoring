import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "SQUEAKER";
const points = 1;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.ClovenhoofedAnimal],
  cost: 0,
  isPartOfDeck: true,
  variants: [
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
    {
      gameBox: GameBox.Base,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Sycamore,
      count: 1,
    },
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Left,
      treeSymbol: TreeSymbol.HorseChestnut,
      extraTypes: [CardType.WoodlandEdge],
      count: 1,
    },
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      extraTypes: [CardType.WoodlandEdge],
      count: 1,
    },
    {
      gameBox: GameBox.WoodlandEdge,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.SilverFir,
      extraTypes: [CardType.WoodlandEdge],
      count: 1,
    },
    // Promo card P013
    {
      gameBox: GameBox.PromoCards,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      extraTypes: [CardType.WoodlandEdge],
      count: 1,
    },
  ],
  score: () => points,
};

export default blueprint;
