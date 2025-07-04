import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import WoodyPlantSlot from "@/components/common/WoodyPlantSlot";
import {
  CardType,
  DwellerPosition,
  Game,
  GameBox,
  TreeSymbol,
  WoodyPlantCard,
} from "@/game";

const meta = {
  title: "Game Components/Forest/WoodyPlantSlot",
  component: WoodyPlantSlot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WoodyPlantSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

const createArgs = (woodyPlant: WoodyPlantCard) => {
  const game: Game = {
    id: "80ea3dc6-4c9d-454e-9259-86a7b1ae1258",
    gameBoxes: [],
    deck: {
      caves: [],
      woodyPlants: [],
      dwellers: [],
    },
    players: [
      {
        id: "7781c299-6af5-4237-92c1-caa65576c820",
        name: "Dummy Player",
        forest: {
          woodyPlants: [woodyPlant],
          cave: {
            id: "513fc872-560d-44f0-a57e-e5378b060573",
            gameBox: GameBox.Base,
            name: "REGULAR_CAVE",
            cardCount: 0,
          },
        },
      },
    ],
  };

  return { game, woodyPlant };
};

export const Empty: Story = {
  args: {
    ...createArgs({
      id: "da4b1712-09fd-47ee-8595-c09ed5b657b3",
      name: "LINDEN",
      gameBox: GameBox.Base,
      types: [CardType.Tree],
      treeSymbol: TreeSymbol.Linden,
      isPartOfDeck: true,
      dwellers: {
        [DwellerPosition.Top]: [],
        [DwellerPosition.Bottom]: [],
        [DwellerPosition.Left]: [],
        [DwellerPosition.Right]: [],
      },
    }),
    onAddDweller: fn(),
  },
};

export const FullyOccupied: Story = {
  args: {
    ...createArgs({
      id: "da4b1712-09fd-47ee-8595-c09ed5b657b3",
      name: "LINDEN",
      gameBox: GameBox.Base,
      types: [CardType.Tree],
      treeSymbol: TreeSymbol.Linden,
      isPartOfDeck: true,
      dwellers: {
        [DwellerPosition.Top]: [
          {
            id: "ba8ed761-0364-437f-858d-61c7f5147a16",
            name: "PURPLE_EMPEROR",
            gameBox: GameBox.Base,
            types: [CardType.Butterfly, CardType.Insect],
            treeSymbol: TreeSymbol.Birch,
            isPartOfDeck: true,
            position: DwellerPosition.Top,
          },
        ],
        [DwellerPosition.Bottom]: [
          {
            id: "43f458f5-81ea-4019-a479-949d74094776",
            name: "BLACKBERRIES",
            gameBox: GameBox.Base,
            types: [CardType.Plant],
            treeSymbol: TreeSymbol.SilverFir,
            isPartOfDeck: true,
            position: DwellerPosition.Bottom,
          },
        ],
        [DwellerPosition.Left]: [
          {
            id: "85640ef6-30a0-48f7-a7d0-4aba89bc37f1",
            name: "EUROPEAN_HARE",
            gameBox: GameBox.Base,
            types: [CardType.PawedAnimal],
            treeSymbol: TreeSymbol.Beech,
            isPartOfDeck: true,
            position: DwellerPosition.Left,
            modifiers: {
              enablesSlotSharing: ({ dweller }) => ({
                position: dweller.position,
                name: dweller.name,
              }),
            },
          },
          {
            id: "5d267fc1-d8c1-4ccc-9b30-acd63bacce6d",
            name: "EUROPEAN_HARE",
            gameBox: GameBox.Base,
            types: [CardType.PawedAnimal],
            treeSymbol: TreeSymbol.Linden,
            isPartOfDeck: true,
            position: DwellerPosition.Left,
            modifiers: {
              enablesSlotSharing: ({ dweller }) => ({
                position: dweller.position,
                name: dweller.name,
              }),
            },
          },
        ],
        [DwellerPosition.Right]: [
          {
            id: "6cfebd3e-b770-4f7b-9f17-64aef35b1a6d",
            name: "GNAT",
            gameBox: GameBox.Base,
            types: [CardType.Insect],
            treeSymbol: TreeSymbol.Birch,
            isPartOfDeck: true,
            position: DwellerPosition.Right,
          },
        ],
      },
    }),
    onAddDweller: fn(),
  },
};
