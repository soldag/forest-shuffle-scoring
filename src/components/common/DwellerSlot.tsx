import React from "react";

import { Stack } from "@mui/joy";

import AddDwellerButton from "@/components/common/AddDwellerButton";
import DwellerCard from "@/components/common/DwellerCard";
import {
  DwellerCard as DwellerCardType,
  DwellerPosition,
  Game,
  TreeCard as TreeCardType,
  getDwellerCandidates,
} from "@/game";

const BUTTON_MARGIN = 1;

interface DwellerSlotProps {
  game: Game;
  tree: TreeCardType;
  position: DwellerPosition;
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
  switch (position) {
    case DwellerPosition.Top:
      return { mb: BUTTON_MARGIN };
    case DwellerPosition.Bottom:
      return { mt: BUTTON_MARGIN };
    case DwellerPosition.Left:
      return { mr: BUTTON_MARGIN };
    case DwellerPosition.Right:
      return { ml: BUTTON_MARGIN };
  }
};

const DwellerSlot: React.FC<DwellerSlotProps> = ({
  game,
  tree,
  position,
  onAdd,
  onDwellerClick,
}) => {
  const dwellers = tree.dwellers[position];
  const canAddDweller =
    getDwellerCandidates(game, tree.id, position).length > 0;

  return (
    <Stack direction={getDirection(position)}>
      {canAddDweller && (
        <AddDwellerButton
          position={position}
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
          onClick={() => onDwellerClick?.(dweller)}
        />
      ))}
    </Stack>
  );
};

export default DwellerSlot;
