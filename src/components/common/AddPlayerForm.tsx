import { Control, FieldErrors } from "react-hook-form";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

import { Stack } from "@mui/joy";

import CaveCardCountInput from "@/components/common/CaveCardCountInput";
import FormController from "@/components/common/FormController";
import PlayerNameInput from "@/components/common/PlayerNameInput";
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

export interface AddPlayerFormFields {
  playerName: string;
  caveCardCount: number;
}

interface AddPlayerFormProps {
  control: Control<AddPlayerFormFields>;
  errors: FieldErrors<AddPlayerFormFields>;
  existingPlayerNames?: string[];
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({
  control,
  errors,
  existingPlayerNames = [],
  onSubmit,
}) => {
  const intl = useIntl();

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

        <FormattedMessage
          id="AddPlayerForm.caveCardCount.label"
          defaultMessage="Number of cave cards"
        >
          {([label]) => (
            <FormController
              name="caveCardCount"
              control={control}
              rules={buildRules(intl, { required: true, min: 0 })}
              label={label}
              render={({ field }) => (
                <CaveCardCountInput
                  {...field}
                  variant="soft"
                  placeholder={label as string}
                  error={!!errors.caveCardCount}
                />
              )}
            />
          )}
        </FormattedMessage>
      </Stack>

      {/* This is needed to allow submitting the form by pressing enter */}
      <input type="submit" hidden />
    </form>
  );
};

export default AddPlayerForm;
