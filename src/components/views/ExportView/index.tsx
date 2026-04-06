import { useMemo } from "react";

import { Stack } from "@mui/joy";

import Header from "@/components/common/Header";
import ResponsiveQrCode from "@/components/common/ResponsiveQrCode";
import View from "@/components/common/View";
import { encodePlayer } from "@/game/sharing";
import { requireGame } from "@/utils/hoc";

import Footer from "./components/Footer";
import InstructionsCard from "./components/InstructionsCard";

const ExportView = requireGame(({ game }) => {
  const encodedPlayer = useMemo(
    () => encodePlayer(game, game.players[0]),
    [game],
  );

  return (
    <View
      header={<Header showThemeButton showResetButton />}
      footer={<Footer />}
    >
      <Stack direction="column" sx={{ height: "100%" }}>
        <InstructionsCard />
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ flexGrow: 1 }}
        >
          <ResponsiveQrCode
            data={encodedPlayer}
            sx={{ maxHeight: { lg: "50vh" } }}
          />
        </Stack>
      </Stack>
    </View>
  );
});

export default ExportView;
