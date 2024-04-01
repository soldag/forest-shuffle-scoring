import { forwardRef } from "react";

import AddIcon from "@mui/icons-material/Add";
import { ButtonProps, IconButton } from "@mui/joy";

import { CARD_SIZES } from "@/styles/sizes";

const AddTreeButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ sx, ...otherProps }, ref) => (
    <IconButton
      {...otherProps}
      ref={ref}
      variant="outlined"
      size="lg"
      sx={{
        ...sx,
        ...CARD_SIZES,
        borderStyle: "dashed",
      }}
    >
      <AddIcon />
    </IconButton>
  ),
);

export default AddTreeButton;
