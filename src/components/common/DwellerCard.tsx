import * as _ from "lodash-es";
import React from "react";
import { useIntl } from "react-intl";

import { Card, CardContent, Link, Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import TreeSymbol from "@/components/common/TreeSymbol";
import { DwellerCard as DwellerCardType, DwellerPosition } from "@/game/types";
import { getBackgroundForCardTypes } from "@/styles/colors";
import { CARD_SIZES } from "@/styles/sizes";
import { getLocalizedCardName } from "@/translations/messages/CardNames";
import { mergeSx } from "@/utils/sx";

type AttachPosition = "top" | "bottom" | "left" | "right";

interface DwellerCardProps {
  card: DwellerCardType;
  attached?: AttachPosition;
  compact?: boolean;
  sx?: SxProps;
  onClick?: () => void;
}

const getAttachedStyles = (attached?: AttachPosition) => {
  if (!attached) {
    return {};
  }

  const cssAttached = _.upperFirst(attached);
  return {
    [`padding${cssAttached}`]: "calc(var(--Card-padding) + var(--Card-radius))",
    [`margin${cssAttached}`]: "calc(-1 * var(--Card-radius))",
    ...(["top", "bottom"].includes(attached) && {
      [`border${cssAttached}LeftRadius`]: 0,
      [`border${cssAttached}RightRadius`]: 0,
    }),
    ...(["left", "right"].includes(attached) && {
      [`borderTop${cssAttached}Radius`]: 0,
      [`borderBottom${cssAttached}Radius`]: 0,
    }),
  };
};

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
    <Card
      variant="plain"
      sx={mergeSx(sx, {
        ...getAttachedStyles(attached),
        background: getBackgroundForCardTypes(
          card.types,
          hasHorizontalSplit ? "horizontal" : "vertical",
        ),
        width: hasHorizontalSplit || !compact ? CARD_SIZES.width : "auto",
        height: !hasHorizontalSplit || !compact ? CARD_SIZES.height : "auto",
        boxShadow: "card",
      })}
    >
      <CardContent>
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
                writingMode: hasHorizontalSplit
                  ? "horizontal-tb"
                  : "vertical-lr",
              }}
            >
              <Link
                overlay
                underline="none"
                sx={{ color: "inherit" }}
                onClick={onClick}
              >
                {getLocalizedCardName(intl, card.name)}
              </Link>
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
      </CardContent>
    </Card>
  );
};

export default DwellerCard;
