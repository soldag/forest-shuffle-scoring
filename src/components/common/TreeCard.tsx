import React from "react";
import { useIntl } from "react-intl";

import ParkIcon from "@mui/icons-material/Park";
import { Card, CardContent, Link, Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { TreeCard as TreeCardType } from "@/cards/types";
import TreeSymbol from "@/components/common/TreeSymbol";
import { getBackgroundForCardTypes } from "@/styles/colors";
import { CARD_SIZES } from "@/styles/sizes";
import { getLocalizedCardName } from "@/translations/messages/CardNames";

interface ForestCardProps {
  card: TreeCardType;
  sx?: SxProps;
  onClick?: () => void;
}

const TreeCard: React.FC<ForestCardProps> = ({ card, sx, onClick }) => {
  const intl = useIntl();

  return (
    <Card
      variant="plain"
      sx={{
        ...sx,
        ...CARD_SIZES,
        background: getBackgroundForCardTypes(card.types),
        boxShadow: "card",
      }}
    >
      <CardContent>
        <Stack direction="column" alignItems="center" sx={{ height: "100%" }}>
          {card.treeSymbol && (
            <TreeSymbol value={card.treeSymbol} sx={{ alignSelf: "end" }} />
          )}
          <ParkIcon sx={{ color: "neutral.100", width: "80%", flexGrow: 1 }} />
          <Typography level="title-lg" textColor="neutral.100">
            <Link
              overlay
              underline="none"
              sx={{ color: "inherit " }}
              onClick={onClick}
            >
              {getLocalizedCardName(intl, card.name)}
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TreeCard;
