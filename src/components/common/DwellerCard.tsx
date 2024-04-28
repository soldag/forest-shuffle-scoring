import React from "react";
import { useIntl } from "react-intl";

import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import ForestCard, { AttachPosition } from "@/components/common/ForestCard";
import TreeSymbol from "@/components/common/TreeSymbol";
import { DwellerCard as DwellerCardType, DwellerPosition } from "@/game/types";
import { getLocalizedCardName } from "@/translations/messages/CardNames";

interface DwellerCardProps {
  card: DwellerCardType;
  attached?: AttachPosition;
  compact?: boolean;
  sx?: SxProps;
  onClick?: () => void;
}

const DwellerCard: React.FC<DwellerCardProps> = ({
  card,
  attached,
  compact,
  sx,
  onClick,
}) => {
  const intl = useIntl();

  const hasHorizontalSplit = [
    DwellerPosition.Top,
    DwellerPosition.Bottom,
  ].includes(card.position);
  const isTopOrLeft = [DwellerPosition.Top, DwellerPosition.Left].includes(
    card.position,
  );

  return (
    <ForestCard
      attached={attached}
      card={card}
      compact={compact}
      onClick={onClick}
      sx={sx}
    >
      <Stack
        direction={hasHorizontalSplit ? "column" : "row"}
        justifyContent={isTopOrLeft ? "flex-start" : "flex-end"}
        sx={{ height: "100%", width: "100%" }}
      >
        <Stack
          direction={hasHorizontalSplit ? "row" : "column"}
          alignItems={hasHorizontalSplit ? "start" : "end"}
          justifyContent="space-between"
          sx={{
            height: hasHorizontalSplit ? "fit-content" : "100%",
            width: hasHorizontalSplit ? "100%" : "fit-content",
          }}
        >
          <Typography
            level="title-lg"
            textColor="neutral.100"
            sx={{
              writingMode: hasHorizontalSplit ? "horizontal-tb" : "vertical-lr",
            }}
          >
            {getLocalizedCardName(intl, card.name)}
          </Typography>
          {card.treeSymbol && (
            <TreeSymbol
              attach={hasHorizontalSplit ? "top" : "right"}
              value={card.treeSymbol}
              sx={{
                [hasHorizontalSplit ? "mt" : "mr"]:
                  "calc(-1 * var(--Card-padding))",
              }}
            />
          )}
        </Stack>
      </Stack>
    </ForestCard>
  );
};

export default DwellerCard;
