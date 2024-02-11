import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { ButtonProps, IconButton } from "@mui/joy";

import { CARD_SIZES } from "@/styles/sizes";

const AddTreeButton: React.FC<ButtonProps> = ({ sx, ...otherProps }) => (
  <IconButton
    {...otherProps}
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
);

export default AddTreeButton;
