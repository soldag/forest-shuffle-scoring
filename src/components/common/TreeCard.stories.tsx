import type { Meta, StoryObj } from "@storybook/react";

import TreeCard from "@/components/common/TreeCard";
import { CardType, DwellerPosition, TreeSymbol } from "@/game";

const meta = {
  title: "Game Components/Cards/TreeCard",
  component: TreeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TreeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: {
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
  },
};
