import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import TreeSymbolButton from "@/components/common/TreeSymbolButton";
import { TreeSymbol } from "@/game";

const meta = {
  title: "Game Components/Card Selector/TreeSymbolButton",
  component: TreeSymbolButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TreeSymbolButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    treeSymbol: TreeSymbol.SilverFir,
    onClick: fn(),
  },
};
