import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

import { Stack } from "@mui/joy";

import CaveFormControls, {
  CaveFormControlsFields,
} from "@/components/common/CaveFormControls";
import FormController from "@/components/common/FormController";
import PlayerNameInput from "@/components/common/PlayerNameInput";
import { Player } from "@/game";
import { MAX_PLAYER_NAME_LENGTH } from "@/utils/constants";
import { buildRules } from "@/utils/forms";

const validationMessages = defineMessages({
  playerNameUnique: {
    id: "AddPlayerForm.playerName.validation.unique",
    defaultMessage: "This name is already taken.",
  },
});

const cleanPlayerName = (value: string) => value.toLowerCase().trim();

const validateUniqueName = (name: string, existingNames: string[]) =>
  existingNames.every((x) => cleanPlayerName(x) !== cleanPlayerName(name));

export interface AddPlayerFormFields extends CaveFormControlsFields {
  playerName: string;
}

interface AddPlayerFormProps {
  caveNameOptions: string[];
  existingPlayers?: Player[];
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
}

const AddPlayerForm = ({
  caveNameOptions = [],
  existingPlayers = [],
  onSubmit,
}: AddPlayerFormProps) => {
  const intl = useIntl();

  const {
    control,
    formState: { errors },
  } = useFormContext<AddPlayerFormFields>();

  const existingPlayerNames = useMemo(
    () => existingPlayers?.map((p) => p.name) ?? [],
    [existingPlayers],
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2}>
        <FormattedMessage
          id="AddPlayerForm.playerName.label"
          defaultMessage="Name"
        >
          {([label]) => (
            <FormController
              name="playerName"
              control={control}
              rules={buildRules<string>(intl, {
                required: true,
                maxLength: MAX_PLAYER_NAME_LENGTH,
                validate: {
                  unique: {
                    fn: (v) => validateUniqueName(v, existingPlayerNames),
                    message: validationMessages.playerNameUnique,
                  },
                },
              })}
              label={label}
              render={({ field }) => (
                <PlayerNameInput
                  {...field}
                  autoFocus
                  variant="soft"
                  placeholder={label as string}
                  error={!!errors.playerName}
                />
              )}
            />
          )}
        </FormattedMessage>

        <CaveFormControls nameOptions={caveNameOptions} />
      </Stack>

      {/* This is needed to allow submitting the form by pressing enter */}
      <input type="submit" hidden />
    </form>
  );
};

export default AddPlayerForm;
