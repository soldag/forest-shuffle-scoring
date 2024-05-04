import React from "react";
import { useIntl } from "react-intl";

import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import appIcon from "@/assets/images/appIcon.svg";
import CommonMessages from "@/translations/messages/Common";

interface HeaderTitleProps {
  sx?: SxProps;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ sx }) => {
  const intl = useIntl();

  return (
    <Stack direction="row" alignItems="center" gap={1.5} sx={sx}>
      <img src={appIcon} style={{ height: "32px", width: "32px" }} />
      <Typography level="title-lg">
        {intl.formatMessage(CommonMessages.appName)}
      </Typography>
    </Stack>
  );
};

export default HeaderTitle;
