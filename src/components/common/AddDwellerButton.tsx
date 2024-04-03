import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { ButtonProps, IconButton } from "@mui/joy";

import { DwellerPosition } from "@/game";
import { CARD_SIZES } from "@/styles/sizes";
import { mergeSx } from "@/utils/sx";

interface AddDwellerButtonProps extends ButtonProps {
  position: DwellerPosition;
}

const SMALL_SIZE = "48px";

const getStyle = (position: DwellerPosition) => {
  const common = {
    borderStyle: "dashed",
  };
  if (position === DwellerPosition.Top) {
    return {
      ...common,
      height: SMALL_SIZE,
      width: CARD_SIZES.width,
      mb: 1,
    };
  } else if (position === DwellerPosition.Bottom) {
    return {
      ...common,
      height: SMALL_SIZE,
      width: CARD_SIZES.width,
      mt: 1,
    };
  } else if (position === DwellerPosition.Left) {
    return {
      ...common,
      height: CARD_SIZES.height,
      width: SMALL_SIZE,
      mr: 1,
    };
  } else if (position === DwellerPosition.Right) {
    return {
      ...common,
      height: CARD_SIZES.height,
      width: SMALL_SIZE,
      ml: 1,
    };
  }
};

const AddDwellerButton: React.FC<AddDwellerButtonProps> = ({
  sx,
  position,
  ...otherProps
}) => (
  <IconButton
    {...otherProps}
    variant="outlined"
    size="lg"
    sx={mergeSx(sx, getStyle(position))}
  >
    <AddIcon />
  </IconButton>
);

export default AddDwellerButton;
