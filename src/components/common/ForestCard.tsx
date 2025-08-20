import * as _ from "lodash-es";
import { ReactNode, forwardRef, useContext } from "react";

import { Card, CardContent } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import TutorialContext from "@/components/contexts/TutorialContext";
import { DwellerCard, WoodyPlantCard } from "@/game/types";
import { getBackgroundForCardTypes } from "@/styles/colors";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  hasHorizontalSplit,
  hasVerticalSplit,
} from "@/utils/cards";
import { mergeSx } from "@/utils/sx";

export type ForestCardAttachPosition = "top" | "bottom" | "left" | "right";

export type ForestCardSize = "sm" | "md" | "lg";

interface ForestCardProps {
  attached?: ForestCardAttachPosition;
  card: WoodyPlantCard | DwellerCard;
  children: ReactNode;
  compact?: boolean;
  onClick?: () => void;
  size?: ForestCardSize;
  sx?: SxProps;
}

const getAttachedStyles = (attached?: ForestCardAttachPosition) => {
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

const ForestCard = forwardRef<HTMLDivElement, ForestCardProps>(
  ({ attached, card, children, compact, onClick, size = "md", sx }, ref) => {
    const { onCardClick } = useContext(TutorialContext);

    const handleClick = () => {
      onCardClick();
      onClick?.();
    };

    return (
      <Card
        ref={ref}
        variant="plain"
        onClick={handleClick}
        size={size}
        sx={mergeSx(
          getAttachedStyles(attached),
          (theme) => ({
            "--Card-padding": {
              sm: "0.5rem",
              md: "0.75rem",
              lg: "1rem",
            }[size],
            "boxShadow": "card",
            "background": getBackgroundForCardTypes(
              card.types,
              hasHorizontalSplit(card) ? "horizontal" : "vertical",
            ),
            "cursor": "pointer",
            "fontSize": theme.fontSize[size],
            "height":
              compact || hasHorizontalSplit(card) ? "auto" : CARD_HEIGHT[size],
            "maxHeight": CARD_HEIGHT[size],
            "width":
              compact || hasVerticalSplit(card) ? "auto" : CARD_WIDTH[size],
            "maxWidth": CARD_WIDTH[size],
          }),
          sx,
        )}
      >
        <CardContent>{children}</CardContent>
      </Card>
    );
  },
);
ForestCard.displayName = "ForestCard";

export default ForestCard;
