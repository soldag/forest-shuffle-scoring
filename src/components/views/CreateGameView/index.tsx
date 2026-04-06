import { useContext, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { useLocation } from "wouter";

import { Stack } from "@mui/joy";

import { createGame } from "@/actions/game";
import AppUpdateModal from "@/components/common/AppUpdateModal";
import Header from "@/components/common/Header";
import View from "@/components/common/View";
import AppUpdateContext from "@/components/contexts/AppUpdateContext";
import GameContext from "@/components/contexts/GameContext";
import { GameBox } from "@/game";
import { ScoringMode } from "@/types";

import CreateGameForm from "./components/CreateGameForm";
import Footer from "./components/Footer";
import ScoringModeSection from "./components/ScoringModeSection";
import { CreateGameFormFields } from "./types";

const CreateGameView = () => {
  const [, navigate] = useLocation();
  const { dispatch } = useContext(GameContext);
  const { checkForUpdate } = useContext(AppUpdateContext);

  const [defaultGameBoxes, persistGameBoxes] = useLocalStorage<GameBox[]>(
    "gameBoxes",
    [GameBox.Base],
  );
  const form = useForm<CreateGameFormFields>({
    mode: "onChange",
    defaultValues: {
      gameBoxes: defaultGameBoxes,
      scoringMode: ScoringMode.Host,
      playerName: "",
      caveName: "REGULAR_CAVE",
      caveCardCount: 0,
    },
  });
  const { control, setValue, handleSubmit } = form;
  const scoringMode = useWatch({ control, name: "scoringMode" });

  useEffect(() => {
    const handle = setTimeout(() => checkForUpdate(), 1000);
    return () => clearTimeout(handle);
  }, [checkForUpdate]);

  const handleCreate = (values: CreateGameFormFields) => {
    persistGameBoxes(values.gameBoxes);
    dispatch(createGame(values));
    navigate("/forest");
  };

  return (
    <View
      header={<Header showThemeButton showLanguageSelect />}
      footer={
        <Footer
          canCreate={form.formState.isValid}
          onCreate={handleSubmit(handleCreate)}
        />
      }
    >
      <Stack direction="column" gap={2}>
        <ScoringModeSection
          scoringMode={scoringMode}
          onChange={(value) => setValue("scoringMode", value)}
        />

        <FormProvider {...form}>
          <CreateGameForm onSubmit={handleSubmit(handleCreate)} />
        </FormProvider>
      </Stack>

      <AppUpdateModal />
    </View>
  );
};

export default CreateGameView;
