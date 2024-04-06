import { FormattedMessage } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import { Box, Stack, Typography } from "@mui/joy";

import View from "@/components/common/View";
import { scoreGame } from "@/game";
import { requireGame } from "@/utils/hoc";
import { isAndroid, isIOS } from "@/utils/os";

import BGStatsButton from "./components/BGStatsButton";
import BasicScoringTable from "./components/BasicScoringTable";
import DetailedScoringTable from "./components/DetailedScoringTable";
import DetailsSwitch from "./components/DetailsSwitch";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WinnersCard from "./components/WinnersCard";

const ScoringView: React.FC = requireGame(({ game }) => {
  const [showDetails, setShowDetails] = useLocalStorage(
    "showScoringDetails",
    false,
  );

  const scoring = scoreGame(game);
  const showBGStatsButton = isAndroid() || isIOS() || import.meta.env.DEV;

  return (
    <View header={<Header />} footer={<Footer />}>
      <WinnersCard game={game} scoring={scoring} sx={{ mb: 4 }} />

      <Stack direction="row" justifyContent="space-between">
        <Typography level="title-md">
          <FormattedMessage id="ScoringView.results" defaultMessage="Results" />
        </Typography>
        <DetailsSwitch
          checked={showDetails}
          onChange={(e) => setShowDetails(e.target.checked)}
        />
      </Stack>

      <Box sx={{ mt: 1, mb: 2 }}>
        {showDetails ? (
          <DetailedScoringTable game={game} scoring={scoring} />
        ) : (
          <BasicScoringTable game={game} scoring={scoring} />
        )}
      </Box>

      {showBGStatsButton && (
        <BGStatsButton
          game={game}
          scoring={scoring}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        />
      )}
    </View>
  );
});

export default ScoringView;
