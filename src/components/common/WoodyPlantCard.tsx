import { useIntl } from "react-intl";

import GrassIcon from "@mui/icons-material/Grass";
import ParkIcon from "@mui/icons-material/Park";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import ForestCard, { ForestCardSize } from "@/components/common/ForestCard";
import TreeSymbol from "@/components/common/TreeSymbol";
import { CardType, WoodyPlantCard as WoodyPlantCardType } from "@/game/types";
import { getLocalizedCardName } from "@/translations/messages/CardNames";

interface ForestCardProps {
  card: WoodyPlantCardType;
  size?: ForestCardSize;
  sx?: SxProps;
  onClick?: () => void;
}

const getIcon = (cardTypes: CardType[]) => {
  if (cardTypes.includes(CardType.Tree)) {
    return ParkIcon;
  } else if (cardTypes.includes(CardType.Shrub)) {
    return GrassIcon;
  } else {
    return QuestionMarkIcon;
  }
};

const WoodyPlantCard = ({ card, size, sx, onClick }: ForestCardProps) => {
  const intl = useIntl();

  const Icon = getIcon(card.types);

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

        <Icon
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

export default WoodyPlantCard;
