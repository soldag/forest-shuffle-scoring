import type { Meta, StoryObj } from "@storybook/react-vite";

import DwellerCard from "@/components/common/DwellerCard";
import { CardType, DwellerPosition, GameBox, TreeSymbol } from "@/game";

const meta = {
  title: "Game Components/Cards/DwellerCard",
  component: DwellerCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DwellerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    card: {
      id: "ba8ed761-0364-437f-858d-61c7f5147a16",
      name: "PURPLE_EMPEROR",
      gameBox: GameBox.Base,
      types: [CardType.Butterfly, CardType.Insect],
      treeSymbol: TreeSymbol.Birch,
      isPartOfDeck: true,
      position: DwellerPosition.Top,
    },
  },
};

export const Bottom: Story = {
  args: {
    card: {
      id: "43f458f5-81ea-4019-a479-949d74094776",
      name: "BLACKBERRIES",
      gameBox: GameBox.Base,
      types: [CardType.Plant],
      treeSymbol: TreeSymbol.SilverFir,
      isPartOfDeck: true,
      position: DwellerPosition.Bottom,
    },
  },
};

export const Left: Story = {
  args: {
    card: {
      id: "85640ef6-30a0-48f7-a7d0-4aba89bc37f1",
      name: "BARBASTELLE_BAT",
      gameBox: GameBox.Base,
      types: [CardType.Bat],
      treeSymbol: TreeSymbol.HorseChestnut,
      isPartOfDeck: true,
      position: DwellerPosition.Left,
    },
  },
};

export const Right: Story = {
  args: {
    card: {
      id: "6cfebd3e-b770-4f7b-9f17-64aef35b1a6d",
      name: "LYNX",
      gameBox: GameBox.Base,
      types: [CardType.PawedAnimal],
      treeSymbol: TreeSymbol.DouglasFir,
      isPartOfDeck: true,
      position: DwellerPosition.Right,
    },
  },
};
