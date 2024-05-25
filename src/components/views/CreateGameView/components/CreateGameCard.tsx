import { useForm } from "react-hook-form";
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
import ExpansionSelector from "@/components/common/ExpansionSelector";
import { Expansion } from "@/game";

interface CreateGameFormFields {
  playerName: string;
  caveCardCount: number;
  expansions: Expansion[];
}

interface CreateGameCardProps {
  sx?: SxProps;
  onSubmit: (values: CreateGameFormFields) => void;
}

const CreateGameCard: React.FC<CreateGameCardProps> = ({ sx, onSubmit }) => {
  const [expansions, setExpansions] = useLocalStorage<Expansion[]>(
    "expansions",
    [],
  );

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<AddPlayerFormFields>({
    mode: "onChange",
    defaultValues: {
      playerName: "",
      caveCardCount: 0,
    },
  });

  const onSubmitWrapper = (values: AddPlayerFormFields) =>
    onSubmit({
      ...values,
      expansions,
    });

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
        <AddPlayerForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmitWrapper)}
        />

        <FormLabel sx={{ mt: 2, mb: 0.5 }}>
          <FormattedMessage
            id="CreateGameView.CreateGameCard.expansions.label"
            defaultMessage="Expansions"
          />
        </FormLabel>
        <ExpansionSelector value={expansions} onChange={setExpansions} />
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
