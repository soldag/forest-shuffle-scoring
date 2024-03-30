import { forwardRef, useCallback } from "react";

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

const CaveCardCountInput = forwardRef<
  HTMLInputElement,
  CaveCardCountInputProps
>(({ value, onChange, ...remainingProps }, ref) => {
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
      ref={ref}
      type="number"
      startDecorator={<StyleIcon />}
      slotProps={{ input: { min: 0 } }}
      value={value === null ? "" : value.toString()}
      onChange={handleChange}
    />
  );
});

export default CaveCardCountInput;
