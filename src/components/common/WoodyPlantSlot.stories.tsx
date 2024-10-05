import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import WoodyPlantSlot from "@/components/common/WoodyPlantSlot";
import {
  CardType,
  DwellerPosition,
  GameBox,
  TreeSymbol,
  createGame,
} from "@/game";
import { DEFAULT_MODIFIERS } from "@/game/dwellers/modifiers";

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

export const Empty: Story = {
  args: {
    game: createGame([GameBox.Base]),
    woodyPlant: {
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
    },
    onAddDweller: fn(),
  },
};

export const FullyOccupied: Story = {
  args: {
    game: createGame([GameBox.Base]),
    woodyPlant: {
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
            modifiers: DEFAULT_MODIFIERS,
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
            modifiers: DEFAULT_MODIFIERS,
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
              ...DEFAULT_MODIFIERS,
              sharesSlotWith: Infinity,
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
              ...DEFAULT_MODIFIERS,
              sharesSlotWith: Infinity,
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
            modifiers: DEFAULT_MODIFIERS,
          },
        ],
      },
    },
    onAddDweller: fn(),
  },
};
