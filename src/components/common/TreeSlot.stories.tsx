import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { CardType, DwellerPosition, TreeSymbol, createGame } from "@/cards";
import { DEFAULT_MODIFIERS } from "@/cards/dwellers/modifiers";
import TreeSlot from "@/components/common/TreeSlot";

const meta = {
  title: "Game Components/Forest/TreeSlot",
  component: TreeSlot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TreeSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    game: createGame(),
    tree: {
      id: "da4b1712-09fd-47ee-8595-c09ed5b657b3",
      name: "LINDEN",
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
    game: createGame(),
    tree: {
      id: "da4b1712-09fd-47ee-8595-c09ed5b657b3",
      name: "LINDEN",
      types: [CardType.Tree],
      treeSymbol: TreeSymbol.Linden,
      isPartOfDeck: true,
      dwellers: {
        [DwellerPosition.Top]: [
          {
            id: "ba8ed761-0364-437f-858d-61c7f5147a16",
            name: "PURPLE_EMPEROR",
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
