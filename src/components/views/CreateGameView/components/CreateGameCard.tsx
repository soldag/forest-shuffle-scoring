import * as _ from "lodash-es";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useLocalStorage } from "usehooks-ts";

import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormLabel,
  Typography,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import AddPlayerForm, {
  AddPlayerFormFields,
} from "@/components/common/AddPlayerForm";
import GameBoxSelector from "@/components/common/GameBoxSelector";
import { GameBox } from "@/game";
import * as Caves from "@/game/caves";

interface CreateGameCardValues {
  gameBoxes: GameBox[];
  playerName: string;
  caveName: string;
  caveCardCount: number;
}

interface CreateGameCardProps {
  sx?: SxProps;
  onSubmit: (values: CreateGameCardValues) => void;
}

const CreateGameCard = ({ sx, onSubmit }: CreateGameCardProps) => {
  const [gameBoxes, setGameBoxes] = useLocalStorage<GameBox[]>("gameBoxes", [
    GameBox.Base,
  ]);

  const form = useForm<AddPlayerFormFields>({
    mode: "onChange",
    defaultValues: {
      playerName: "",
      caveName: "REGULAR_CAVE",
      caveCardCount: 0,
    },
  });
  const {
    formState: { isValid },
    handleSubmit,
  } = form;

  const caveNameOptions = useMemo(
    () =>
      _.uniq(
        Object.values(Caves)
          .filter((c) => gameBoxes.includes(c.gameBox))
          .map((c) => c.name),
      ),
    [gameBoxes],
  );

  const onSubmitWrapper = (values: AddPlayerFormFields) =>
    onSubmit({ ...values, gameBoxes });

  return (
    <Card color="neutral" variant="outlined" sx={sx}>
      <Typography level="title-lg" startDecorator={<AddIcon />}>
        <FormattedMessage
          id="CreateGameView.CreateGameCard.header"
          defaultMessage="Score a new game"
        />
      </Typography>

      <Divider inset="none" />

      <Typography level="body-sm">
        <FormattedMessage
          id="CreateGameView.CreateGameCard.introduction"
          defaultMessage="To start scoring your Forest Shuffle game please enter the name of the player you want to start with and the number of cards in their cave."
        />
      </Typography>

      <CardContent>
        <FormProvider {...form}>
          <AddPlayerForm
            caveNameOptions={caveNameOptions}
            onSubmit={handleSubmit(onSubmitWrapper)}
          />
        </FormProvider>

        <FormLabel sx={{ mt: 2, mb: 0.5 }}>
          <FormattedMessage
            id="CreateGameView.CreateGameCard.expansions.label"
            defaultMessage="Expansions"
          />
        </FormLabel>
        <GameBoxSelector
          value={gameBoxes}
          ignore={[GameBox.Base]}
          onChange={setGameBoxes}
        />
      </CardContent>

      <CardActions>
        <Button disabled={!isValid} onClick={handleSubmit(onSubmitWrapper)}>
          <FormattedMessage
            id="CreateGameView.CreateGameCard.startScoring"
            defaultMessage="Start scoring"
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateGameCard;
