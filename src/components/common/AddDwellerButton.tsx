import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { ButtonProps, IconButton } from "@mui/joy";

import { DwellerPosition } from "@/game";
import { isPositionX, isPositionY } from "@/utils/cards";
import { mergeSx } from "@/utils/sx";

interface AddDwellerButtonProps extends ButtonProps {
  position: DwellerPosition;
}

const SMALL_SIZE = "48px";

const AddDwellerButton: React.FC<AddDwellerButtonProps> = ({
  sx,
  position,
  ...otherProps
}) => (
  <IconButton
    {...otherProps}
    variant="outlined"
    size="lg"
    sx={mergeSx(sx, {
      borderStyle: "dashed",
      height: isPositionY(position) ? SMALL_SIZE : "auto",
      width: isPositionX(position) ? SMALL_SIZE : "auto",
    })}
  >
    <AddIcon />
  </IconButton>
);

export default AddDwellerButton;
