import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import CardButton from "@/components/common/CardButton";
import { CardType, DwellerCard, DwellerPosition, TreeSymbol } from "@/game";

const meta = {
  title: "Game Components/Card Selector/CardButton",
  component: CardButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CardButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleColor: Story = {
  args: {
    card: {
      id: "43f458f5-81ea-4019-a479-949d74094776",
      name: "BLACKBERRIES",
      types: [CardType.Plant],
      treeSymbol: TreeSymbol.SilverFir,
      isPartOfDeck: true,
      position: DwellerPosition.Bottom,
    } as DwellerCard,
    onClick: fn(),
  },
};

export const Gradient: Story = {
  args: {
    card: {
      id: "ba8ed761-0364-437f-858d-61c7f5147a16",
      name: "PURPLE_EMPEROR",
      types: [CardType.Butterfly, CardType.Insect],
      treeSymbol: TreeSymbol.Birch,
      isPartOfDeck: true,
      position: DwellerPosition.Top,
    } as DwellerCard,
  },
};
