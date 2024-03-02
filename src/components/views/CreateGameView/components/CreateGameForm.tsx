import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Input,
  Typography,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import FormController from "@/components/common/FormController";
import { MAX_PLAYER_NAME_LENGTH } from "@/utils/constants";
import { buildRules } from "@/utils/forms";

export interface CreateGameFormFields {
  playerName: string;
}

interface CreateGameFormProps {
  sx?: SxProps;
  onSubmit: (values: CreateGameFormFields) => void;
}

const CreateGameForm: React.FC<CreateGameFormProps> = ({ sx, onSubmit }) => {
  const intl = useIntl();
  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<CreateGameFormFields>({
    mode: "onTouched",
    defaultValues: {
      playerName: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card color="neutral" variant="outlined" sx={sx}>
        <Typography level="title-lg" startDecorator={<AddIcon />}>
          <FormattedMessage
            id="CreateGameView.CreateGameForm.header"
            defaultMessage="Score a new game"
          />
        </Typography>

        <Divider inset="none" />

        <Typography level="body-sm">
          <FormattedMessage
            id="CreateGameView.CreateGameForm.introduction"
            defaultMessage="To start scoring your Forest Shuffle game please enter the name of the player you want to start with."
          />
        </Typography>

        <CardContent>
          <FormattedMessage
            id="CreateGameView.CreateGameForm.playerName.label"
            defaultMessage="Name"
          >
            {([label]) => (
              <FormController
                name="playerName"
                control={control}
                rules={buildRules(intl, {
                  required: true,
                  maxLength: MAX_PLAYER_NAME_LENGTH,
                })}
                label={label}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    variant="soft"
                    startDecorator={<PersonIcon />}
                    placeholder={label as string}
                    error={!!errors.playerName}
                    slotProps={{
                      input: {
                        maxLength: MAX_PLAYER_NAME_LENGTH,
                      },
                    }}
                  />
                )}
              />
            )}
          </FormattedMessage>

          <CardActions>
            <Button type="submit" disabled={!isValid}>
              <FormattedMessage
                id="CreateGameView.CreateGameForm.startScoring"
                defaultMessage="Start scoring"
              />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateGameForm;
