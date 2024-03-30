import StyleIcon from "@mui/icons-material/Style";
import { Input, InputProps } from "@mui/joy";

type CaveCardCountInputProps = Omit<
  InputProps,
  "startDecorator" | "slotProps" | "type"
>;

const CaveCardCountInput: React.FC<CaveCardCountInputProps> = (props) => (
  <Input
    {...props}
    type="number"
    startDecorator={<StyleIcon />}
    slotProps={{ input: { min: 0 } }}
  />
);

export default CaveCardCountInput;
