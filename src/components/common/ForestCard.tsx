import * as _ from "lodash-es";
import React, { ReactNode } from "react";

import { Card, CardContent } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { DwellerCard, TreeCard } from "@/game/types";
import { getBackgroundForCardTypes } from "@/styles/colors";
import { CARD_SIZES } from "@/styles/sizes";
import { hasHorizontalSplit, hasVerticalSplit } from "@/utils/cards";
import { mergeSx } from "@/utils/sx";

export type AttachPosition = "top" | "bottom" | "left" | "right";

interface ForestCardProps {
  attached?: AttachPosition;
  card: TreeCard | DwellerCard;
  children: ReactNode;
  compact?: boolean;
  onClick?: () => void;
  sx?: SxProps;
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

const ForestCard: React.FC<ForestCardProps> = ({
  attached,
  card,
  children,
  compact,
  onClick,
  sx,
}) => (
  <Card
    variant="plain"
    onClick={onClick}
    sx={mergeSx(sx, getAttachedStyles(attached), {
      boxShadow: "card",
      background: getBackgroundForCardTypes(
        card.types,
        hasHorizontalSplit(card) ? "horizontal" : "vertical",
      ),
      width: !compact || hasHorizontalSplit(card) ? CARD_SIZES.width : "auto",
      height: !compact || hasVerticalSplit(card) ? CARD_SIZES.height : "auto",
    })}
  >
    <CardContent>{children}</CardContent>
  </Card>
);

export default ForestCard;
