import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import WoodyPlantStack from "@/components/common/WoodyPlantStack";
import {
  CardType,
  DwellerPosition,
  Game,
  GameBox,
  TreeSymbol,
  WoodyPlantCard,
} from "@/game";

const meta = {
  title: "Game Components/Forest/WoodyPlantStack",
  component: WoodyPlantStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WoodyPlantStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const createArgs = (woodyPlants: WoodyPlantCard[]) => {
  const game: Game = {
    id: "80ea3dc6-4c9d-454e-9259-86a7b1ae1258",
    deck: {
      woodyPlants: [],
      dwellers: [],
    },
    players: [
      {
        id: "7781c299-6af5-4237-92c1-caa65576c820",
        name: "Dummy Player",
        forest: {
          woodyPlants,
          caveCardCount: 0,
        },
      },
    ],
  };

  return { game, woodyPlants };
};

export const Default: Story = {
  args: {
    ...createArgs([
      {
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
                allowsSlotSharing: (context, dwellerToAdd) =>
                  context.dweller.name === dwellerToAdd.name &&
                  context.dweller.position === dwellerToAdd.position,
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
                allowsSlotSharing: (context, dwellerToAdd) =>
                  context.dweller.name === dwellerToAdd.name &&
                  context.dweller.position === dwellerToAdd.position,
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
      },
      {
        id: "f5aea98f-ad92-460b-9905-2d3e73a9909e",
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
      },
    ]),
    onAddDweller: fn(),
    onAddWoodyPlant: fn(),
  },
};
