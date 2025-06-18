import type { Meta, StoryObj } from "@storybook/react-vite";

import WoodyPlantCard from "@/components/common/WoodyPlantCard";
import { CardType, DwellerPosition, GameBox, TreeSymbol } from "@/game";

const meta = {
  title: "Game Components/Cards/WoodyPlantCard",
  component: WoodyPlantCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WoodyPlantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: {
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
  },
};
