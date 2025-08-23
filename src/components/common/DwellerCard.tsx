import { forwardRef } from "react";
import { useIntl } from "react-intl";

import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import ForestCard, {
  ForestCardAttachPosition,
  ForestCardSize,
} from "@/components/common/ForestCard";
import TreeSymbol from "@/components/common/TreeSymbol";
import { DwellerCard as DwellerCardType, DwellerPosition } from "@/game/types";
import { getLocalizedCardName } from "@/translations/messages/CardNames";

interface DwellerCardProps {
  card: DwellerCardType;
  attached?: ForestCardAttachPosition;
  compact?: boolean;
  size?: ForestCardSize;
  sx?: SxProps;
  onClick?: () => void;
}

const DwellerCard = forwardRef<HTMLDivElement, DwellerCardProps>(
  ({ card, attached, compact, size, sx, onClick }, ref) => {
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
        ref={ref}
        attached={attached}
        card={card}
        compact={compact}
        onClick={onClick}
        size={size}
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
              fontSize="inherit"
              fontWeight="lg"
              textColor="neutral.100"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                writingMode: hasHorizontalSplit
                  ? "horizontal-tb"
                  : "vertical-lr",
              }}
            >
              {getLocalizedCardName(intl, card.name)}
            </Typography>
            {card.treeSymbol && (
              <TreeSymbol
                attach={hasHorizontalSplit ? "top" : "right"}
                value={card.treeSymbol}
                size={size}
                sx={{
                  ml: 1,
                  [hasHorizontalSplit ? "mt" : "mr"]:
                    "calc(-1 * var(--Card-padding))",
                  [hasHorizontalSplit ? "height" : "width"]:
                    "calc(var(--Card-padding) + var(--TreeSymbol-iconSize) + var(--TreeSymbol-padding))",
                }}
              />
            )}
          </Stack>
        </Stack>
      </ForestCard>
    );
  },
);
DwellerCard.displayName = "DwellerCard";

export default DwellerCard;
