import React, { useContext } from "react";

import { Stack } from "@mui/joy";

import AddCardButton from "@/components/common/AddCardButton";
import DwellerCard from "@/components/common/DwellerCard";
import AddDwellerTooltip from "@/components/common/tutorial/AddDwellerTooltip";
import ExchangeCardTooltip from "@/components/common/tutorial/ExchangeCardTooltip";
import TutorialContext from "@/components/contexts/TutorialContext";
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

const getTooltipPlacement = (position: DwellerPosition) => {
  switch (position) {
    case DwellerPosition.Top:
      return "top";
    case DwellerPosition.Bottom:
      return "bottom";
    case DwellerPosition.Left:
      return "bottom-start";
    case DwellerPosition.Right:
      return "bottom-end";
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
  const { exchangeCardTooltipTarget } = useContext(TutorialContext);

  const dwellers = tree.dwellers[position];
  const canAddDweller =
    getDwellerCandidates(game, tree.id, position).length > 0;

  return (
    <Stack direction={getDirection(position)}>
      {canAddDweller && (
        <AddDwellerTooltip
          placement="bottom"
          disabled={position !== DwellerPosition.Bottom}
        >
          <AddCardButton
            size={size}
            onClick={onAdd}
            sx={getButtonStyle(position)}
          />
        </AddDwellerTooltip>
      )}

      {dwellers.toReversed().map((dweller) => (
        <ExchangeCardTooltip
          key={dweller.id}
          placement={getTooltipPlacement(dweller.position)}
          disabled={exchangeCardTooltipTarget !== dweller.id}
        >
          <DwellerCard
            compact
            card={dweller}
            attached={getAttachPosition(position)}
            size={size}
            onClick={() => onDwellerClick?.(dweller)}
          />
        </ExchangeCardTooltip>
      ))}
    </Stack>
  );
};

export default DwellerSlot;
