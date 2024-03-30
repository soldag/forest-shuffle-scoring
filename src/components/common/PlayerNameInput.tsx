import { forwardRef } from "react";

import PersonIcon from "@mui/icons-material/Person";
import { Input, InputProps } from "@mui/joy";

import { MAX_PLAYER_NAME_LENGTH } from "@/utils/constants";

type PlayerNameInputProps = Omit<
  InputProps,
  "startDecorator" | "slotProps" | "type"
>;

const PlayerNameInput = forwardRef<HTMLInputElement, PlayerNameInputProps>(
  (props, ref) => (
    <Input
      {...props}
      ref={ref}
      startDecorator={<PersonIcon />}
      slotProps={{
        input: {
          maxLength: MAX_PLAYER_NAME_LENGTH,
        },
      }}
    />
  ),
);

export default PlayerNameInput;
