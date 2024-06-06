import { useIntl } from "react-intl";

import ParkIcon from "@mui/icons-material/Park";
import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import ForestCard, { ForestCardSize } from "@/components/common/ForestCard";
import TreeSymbol from "@/components/common/TreeSymbol";
import { TreeCard as TreeCardType } from "@/game/types";
import { getLocalizedCardName } from "@/translations/messages/CardNames";

interface ForestCardProps {
  card: TreeCardType;
  size?: ForestCardSize;
  sx?: SxProps;
  onClick?: () => void;
}

const TreeCard = ({ card, size, sx, onClick }: ForestCardProps) => {
  const intl = useIntl();

  return (
    <ForestCard card={card} onClick={onClick} size={size} sx={sx}>
      <Stack direction="column" alignItems="center" sx={{ height: "100%" }}>
        {card.treeSymbol && (
          <TreeSymbol
            attach="top"
            value={card.treeSymbol}
            size={size}
            sx={{
              alignSelf: "end",
              mt: "calc(-1 * var(--Card-padding))",
              height:
                "calc(var(--Card-padding) + var(--TreeSymbol-iconSize) + var(--TreeSymbol-padding))",
            }}
          />
        )}

        <ParkIcon
          sx={{
            color: "neutral.100",
            width: "80%",
            flexGrow: 1,
            mt: card.treeSymbol ? 0 : "18px",
          }}
        />

        <Typography fontSize="inherit" fontWeight="lg" textColor="neutral.100">
          {getLocalizedCardName(intl, card.name)}
        </Typography>
      </Stack>
    </ForestCard>
  );
};

export default TreeCard;
