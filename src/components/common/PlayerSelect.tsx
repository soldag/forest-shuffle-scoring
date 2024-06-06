import PersonIcon from "@mui/icons-material/Person";
import { Option, Select, SelectProps } from "@mui/joy";

import { Player } from "@/game";

interface PlayerSelectProps extends SelectProps<string, false> {
  players?: Player[];
}

const PlayerSelect = ({ players, ...otherProps }: PlayerSelectProps) => {
  return (
    <Select {...otherProps} required startDecorator={<PersonIcon />}>
      {players?.map((p) => (
        <Option key={p.id} value={p.id}>
          {p.name}
        </Option>
      ))}
    </Select>
  );
};

export default PlayerSelect;
