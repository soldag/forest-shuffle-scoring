import { useCallback } from "react";

import StyleIcon from "@mui/icons-material/Style";
import { Input, InputProps } from "@mui/joy";

interface CaveCardCountInputProps
  extends Omit<
    InputProps,
    "startDecorator" | "slotProps" | "type" | "onChange" | "value"
  > {
  value: number | null;
  onChange?: (value: number | null) => void;
}

const CaveCardCountInput: React.FC<CaveCardCountInputProps> = ({
  value,
  onChange,
  ...remainingProps
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      onChange?.(isNaN(value) ? null : value);
    },
    [onChange],
  );

  return (
    <Input
      {...remainingProps}
      type="number"
      startDecorator={<StyleIcon />}
      slotProps={{ input: { min: 0 } }}
      value={value === null ? "" : value}
      onChange={handleChange}
    />
  );
};

export default CaveCardCountInput;
