import PersonIcon from "@mui/icons-material/Person";
import { Input, InputProps } from "@mui/joy";

import { MAX_PLAYER_NAME_LENGTH } from "@/utils/constants";

type PlayerNameInputProps = Omit<
  InputProps,
  "startDecorator" | "slotProps" | "type"
>;

const PlayerNameInput: React.FC<PlayerNameInputProps> = (props) => (
  <Input
    {...props}
    startDecorator={<PersonIcon />}
    slotProps={{
      input: {
        maxLength: MAX_PLAYER_NAME_LENGTH,
      },
    }}
  />
);

export default PlayerNameInput;
