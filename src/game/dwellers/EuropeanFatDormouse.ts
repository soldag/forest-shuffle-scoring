import {
  CardType,
  DwellerCardBlueprint,
  DwellerPosition,
  GameBox,
  TreeSymbol,
} from "../types";

const name = "EUROPEAN_FAT_DORMOUSE";
const gameBox = GameBox.Base;
const pointsWithBat = 15;

const blueprint: DwellerCardBlueprint = {
  name,
  types: [CardType.PawedAnimal],
  cost: 1,
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
      treeSymbol: TreeSymbol.SilverFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.DouglasFir,
      count: 1,
    },
    {
      gameBox,
      position: DwellerPosition.Right,
      treeSymbol: TreeSymbol.Oak,
      count: 1,
    },
  ],
  score: ({ woodyPlant, dweller }) => {
    const oppositeDwellers =
      dweller.position === DwellerPosition.Left
        ? woodyPlant?.dwellers[DwellerPosition.Right]
        : woodyPlant?.dwellers[DwellerPosition.Left];

    return oppositeDwellers?.some((c) => c.types.includes(CardType.Bat))
      ? pointsWithBat
      : 0;
  },
};

export default blueprint;
