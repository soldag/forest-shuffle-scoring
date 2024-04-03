import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import CommonMessages from "@/translations/messages/Common";
import { mergeSx } from "@/utils/sx";

interface HeaderTitleProps {
  sx?: SxProps;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ sx }) => {
  const intl = useIntl();

  return (
    <Typography level="title-lg" sx={mergeSx(sx, { py: 0.5 })}>
      {intl.formatMessage(CommonMessages.appName)}
    </Typography>
  );
};

export default HeaderTitle;
