import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { ButtonProps, IconButton } from "@mui/joy";

import { mergeSx } from "@/utils/sx";

const AddCardButton: React.FC<Omit<ButtonProps, "variant">> = ({
  sx,
  ...otherProps
}) => (
  <IconButton
    {...otherProps}
    variant="outlined"
    sx={mergeSx(sx, {
      borderStyle: "dashed",
    })}
  >
    <AddIcon />
  </IconButton>
);

export default AddCardButton;
