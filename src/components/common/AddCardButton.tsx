import { forwardRef } from "react";

import AddIcon from "@mui/icons-material/Add";
import { ButtonProps, IconButton } from "@mui/joy";

import { mergeSx } from "@/utils/sx";

type AddCardButtonProps = Omit<ButtonProps, "variant">;

const AddCardButton = forwardRef<HTMLButtonElement, AddCardButtonProps>(
  ({ sx, ...otherProps }, ref) => (
    <IconButton
      {...otherProps}
      ref={ref}
      variant="outlined"
      sx={mergeSx(sx, {
        borderStyle: "dashed",
      })}
    >
      <AddIcon />
    </IconButton>
  ),
);
AddCardButton.displayName = "AddCardButton";

export default AddCardButton;
