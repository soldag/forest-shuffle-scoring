import { omit } from "lodash-es";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import { Box, Stack } from "@mui/joy";

import {
  exchangeDweller,
  exchangeWoodyPlant,
  playDweller,
  playWoodyPlant,
  removeDweller,
  removeWoodyPlant,
} from "@/actions/game";
import CardDrawer from "@/components/common/CardDrawer";
import View from "@/components/common/View";
import WoodyPlantStack from "@/components/common/WoodyPlantStack";
import SwipeToAddTreeTooltip from "@/components/common/tutorial/SwipeToAddTreeTooltip";
import GameContext from "@/components/contexts/GameContext";
import {
  DwellerCard,
  DwellerPosition,
  Game,
  WoodyPlantCard,
  getDwellerCandidates,
  getWoodyPlantCandidates,
} from "@/game";
import { GameDto, createPlayerExportDto } from "@/game/sharing";
import { ScoringMode } from "@/types";
import { requireGame } from "@/utils/hoc";

import Footer from "./components/Footer";
import Header from "./components/Header";

const useResponsiveSize = () => {
  const isLg = useMediaQuery("(min-height: 900px)");
  const isMd = useMediaQuery("(min-height: 800px)");

  if (isLg) {
    return "lg";
  } else if (isMd) {
    return "md";
  } else {
    return "sm";
  }
};

const gameDto: (game: Game, scoringMode: ScoringMode | null) => GameDto = (game, scoringMode) => {
  return omit(
    {
      ...game,
      appVersion: import.meta.env.PACKAGE_VERSION,
      scoringMode: scoringMode ?? ScoringMode.Host,
      players: game.players.map(
        (player) => createPlayerExportDto(game, player).player,
      ),
    },
    "deck",
  );
};

const ForestView = requireGame(({ game }) => {
  const { scoringMode, playerId, dispatch } = useContext(GameContext);

  const [isAddingWoodyPlant, setIsAddingWoodyPlant] = useState(false);
  const [selectedWoodyPlant, setSelectedWoodyPlant] =
    useState<WoodyPlantCard | null>(null);

  const [isAddingDweller, setIsAddingDweller] = useState(false);
  const [dwellerWoodyPlantId, setDwellerWoodyPlantId] = useState<
    string | null
  >();
  const [dwellerPosition, setDwellerPosition] =
    useState<DwellerPosition | null>();
  const [selectedDweller, setSelectedDweller] = useState<DwellerCard | null>();

  const player = game.players.find((p) => p.id === playerId);
  const forest = player?.forest;
  const woodyPlantOptions = useMemo(
    () => [
      ...getWoodyPlantCandidates(game),
      ...(selectedWoodyPlant ? [selectedWoodyPlant] : []),
    ],
    [game, selectedWoodyPlant],
  );
  const dwellerOptions = useMemo(
    () => [
      ...(selectedDweller ? [selectedDweller] : []),
      ...(game && dwellerWoodyPlantId && dwellerPosition
        ? getDwellerCandidates(
            game,
            dwellerWoodyPlantId,
            dwellerPosition,
            selectedDweller,
          )
        : []),
    ],
    [game, dwellerWoodyPlantId, dwellerPosition, selectedDweller],
  );

  const [, persistGame] = useLocalStorage<GameDto>("game", gameDto(game, scoringMode));

  useEffect(() => {
    persistGame(gameDto(game, scoringMode));
  }, [game]);

  const WoodyPlantStackSize = useResponsiveSize();

  const handleAddWoodyPlant = () => {
    setIsAddingWoodyPlant(true);
  };

  const handleSelectWoodyPlant = (woodyPlant: WoodyPlantCard) => {
    if (!playerId) return;
    if (isAddingWoodyPlant) {
      setIsAddingWoodyPlant(false);
      dispatch(playWoodyPlant({ playerId, woodyPlant }));
    } else if (selectedWoodyPlant) {
      setSelectedWoodyPlant(null);
      dispatch(
        exchangeWoodyPlant({
          playerId,
          oldWoodyPlantId: selectedWoodyPlant.id,
          newWoodyPlant: woodyPlant,
        }),
      );
    }
  };

  const handleRemoveWoodyPlant = () => {
    if (selectedWoodyPlant && playerId) {
      setSelectedWoodyPlant(null);
      dispatch(
        removeWoodyPlant({ playerId, woodyPlantId: selectedWoodyPlant.id }),
      );
    }
  };

  const handleWoodyPlantClick = (woodyPlant: WoodyPlantCard) => {
    setSelectedWoodyPlant(woodyPlant);
  };

  const handleCloseWoodyPlantDrawer = () => {
    setIsAddingWoodyPlant(false);
    setSelectedWoodyPlant(null);
  };

  const handleAddDweller = (
    woodyPlantId: string,
    position: DwellerPosition,
  ) => {
    setIsAddingDweller(true);
    setDwellerWoodyPlantId(woodyPlantId);
    setDwellerPosition(position);
  };

  const handleSelectDweller = (dweller: DwellerCard) => {
    if (!playerId) return;

    if (isAddingDweller && dwellerWoodyPlantId) {
      setIsAddingDweller(false);
      dispatch(
        playDweller({ playerId, woodyPlantId: dwellerWoodyPlantId, dweller }),
      );
    } else if (selectedDweller) {
      setSelectedDweller(null);
      dispatch(
        exchangeDweller({
          playerId,
          oldDwellerId: selectedDweller.id,
          newDweller: dweller,
        }),
      );
    }

    setDwellerWoodyPlantId(null);
    setDwellerPosition(null);
  };

  const handleRemoveDweller = () => {
    if (selectedDweller && playerId) {
      setSelectedDweller(null);
      dispatch(removeDweller({ playerId, dwellerId: selectedDweller.id }));
    }
  };

  const handleDwellerClick = (
    woodyPlant: WoodyPlantCard,
    dweller: DwellerCard,
  ) => {
    setDwellerWoodyPlantId(woodyPlant.id);
    setDwellerPosition(dweller.position);
    setSelectedDweller(dweller);
  };

  const handleCloseDwellerDrawer = () => {
    setIsAddingDweller(false);
    setSelectedDweller(null);
    setDwellerWoodyPlantId(null);
    setDwellerPosition(null);
  };

  return (
    <View disableGutters fullWidth header={<Header />} footer={<Footer />}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            scrollSnapType: { xs: "x mandatory", sm: "none" },
          }}
        >
          <Box sx={{ flex: "1 1 0" }} />
          <WoodyPlantStack
            game={game!}
            woodyPlants={forest?.woodyPlants || []}
            size={WoodyPlantStackSize}
            onAddWoodyPlant={handleAddWoodyPlant}
            onAddDweller={handleAddDweller}
            onWoodyPlantClick={handleWoodyPlantClick}
            onDwellerClick={handleDwellerClick}
          />

          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ flex: "1 1 0", pb: 2, px: 2 }}
          >
            <SwipeToAddTreeTooltip />
          </Stack>
        </Box>
      </Box>

      <CardDrawer
        action={isAddingWoodyPlant ? "add" : "exchange"}
        open={isAddingWoodyPlant || !!selectedWoodyPlant}
        onClose={handleCloseWoodyPlantDrawer}
        cards={woodyPlantOptions}
        selectedCard={selectedWoodyPlant}
        onSelectCard={handleSelectWoodyPlant}
        onRemoveCard={handleRemoveWoodyPlant}
      />
      <CardDrawer
        action={isAddingDweller ? "add" : "exchange"}
        open={isAddingDweller || !!selectedDweller}
        onClose={handleCloseDwellerDrawer}
        cards={dwellerOptions}
        selectedCard={selectedDweller}
        onSelectCard={handleSelectDweller}
        onRemoveCard={handleRemoveDweller}
      />
    </View>
  );
});

export default ForestView;
