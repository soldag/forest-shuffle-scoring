import React from "react";
import { FormattedMessage } from "react-intl";

import { Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

interface HeaderTitleProps {
  sx?: SxProps;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ sx }) => (
  <Typography
    level="title-lg"
    sx={{
      ...sx,
      py: 0.5,
    }}
  >
    <FormattedMessage
      id="HeaderTitle.text"
      defaultMessage="Forest Shuffle Scoring"
    />
  </Typography>
);

export default HeaderTitle;
