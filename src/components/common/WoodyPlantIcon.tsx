import GrassIcon from "@mui/icons-material/Grass";
import ParkIcon from "@mui/icons-material/Park";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { SvgIcon } from "@mui/material";

import { CardType } from "@/game";

interface WoodyPlantIconProps extends React.ComponentProps<typeof SvgIcon> {
  cardTypes: CardType[];
}

const WoodyPlantIcon = ({ cardTypes, sx }: WoodyPlantIconProps) => {
  if (cardTypes.includes(CardType.Tree)) {
    return <ParkIcon sx={sx} />;
  } else if (cardTypes.includes(CardType.Shrub)) {
    return <GrassIcon sx={sx} />;
  } else {
    return <QuestionMarkIcon sx={sx} />;
  }
};

export default WoodyPlantIcon;
