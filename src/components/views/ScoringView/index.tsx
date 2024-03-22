import { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { Container, Typography } from "@mui/joy";

import View from "@/components/common/View";
import GameContext from "@/components/contexts/GameContext";
import BGStatsButton from "@/components/views/ScoringView/components/BGStatsButton";
import ScoringTable from "@/components/views/ScoringView/components/ScoringTable";
import { scoreGame } from "@/game";
import { isAndroid, isIOS } from "@/utils/os";

import Footer from "./components/Footer";
import Header from "./components/Header";
import WinnersCard from "./components/WinnersCard";

const ScoringView: React.FC = () => {
  const { game } = useContext(GameContext);

  if (!game) {
    return null;
  }

  const scoring = scoreGame(game);
  const showBGStatsButton = isAndroid() || isIOS() || import.meta.env.DEV;

  return (
    <View header={<Header />} footer={<Footer />}>
      <Container>
        <WinnersCard game={game} scoring={scoring} sx={{ mb: 2 }} />
        <Typography level="title-md">
          <FormattedMessage id="ScoringView.results" defaultMessage="Results" />
        </Typography>
        <ScoringTable game={game} scoring={scoring} sx={{ mb: 1 }} />
        {showBGStatsButton && (
          <BGStatsButton
            game={game}
            scoring={scoring}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
        )}
      </Container>
    </View>
  );
};

export default ScoringView;
