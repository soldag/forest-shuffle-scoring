import React from "react";

import { Stack } from "@mui/joy";

import AddCardButton from "@/components/common/AddCardButton";
import DwellerCard from "@/components/common/DwellerCard";
import {
  DwellerCard as DwellerCardType,
  DwellerPosition,
  Game,
  TreeCard as TreeCardType,
  getDwellerCandidates,
} from "@/game";

export type DwellerSlotSize = "sm" | "md" | "lg";

interface DwellerSlotProps {
  game: Game;
  tree: TreeCardType;
  position: DwellerPosition;
  size?: DwellerSlotSize;
  onAdd?: () => void;
  onDwellerClick?: (dweller: DwellerCardType) => void;
}

const getDirection = (position: DwellerPosition) => {
  switch (position) {
    case DwellerPosition.Top:
      return "column";
    case DwellerPosition.Bottom:
      return "column-reverse";
    case DwellerPosition.Left:
      return "row";
    case DwellerPosition.Right:
      return "row-reverse";
  }
};

const getAttachPosition = (position: DwellerPosition) => {
  switch (position) {
    case DwellerPosition.Top:
      return "bottom";
    case DwellerPosition.Bottom:
      return "top";
    case DwellerPosition.Left:
      return "right";
    case DwellerPosition.Right:
      return "left";
  }
};

const getButtonStyle = (position: DwellerPosition) => {
  const margin = 1;
  switch (position) {
    case DwellerPosition.Top:
      return { mb: margin };
    case DwellerPosition.Bottom:
      return { mt: margin };
    case DwellerPosition.Left:
      return { mr: margin };
    case DwellerPosition.Right:
      return { ml: margin };
  }
};

const DwellerSlot: React.FC<DwellerSlotProps> = ({
  game,
  tree,
  position,
  size = "md",
  onAdd,
  onDwellerClick,
}) => {
  const dwellers = tree.dwellers[position];
  const canAddDweller =
    getDwellerCandidates(game, tree.id, position).length > 0;

  return (
    <Stack direction={getDirection(position)}>
      {canAddDweller && (
        <AddCardButton
          size={size}
          onClick={onAdd}
          sx={getButtonStyle(position)}
        />
      )}

      {dwellers.toReversed().map((dweller) => (
        <DwellerCard
          compact
          key={dweller.id}
          card={dweller}
          attached={getAttachPosition(position)}
          size={size}
          onClick={() => onDwellerClick?.(dweller)}
        />
      ))}
    </Stack>
  );
};

export default DwellerSlot;
