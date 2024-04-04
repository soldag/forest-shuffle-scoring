import React from "react";
import { Link } from "wouter";

import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, Stack } from "@mui/joy";

import HeaderContainer from "@/components/common/HeaderContainer";
import HeaderTitle from "@/components/common/HeaderTitle";

const Header: React.FC = () => (
  <HeaderContainer>
    <Stack direction="row" alignItems="center" columnGap={2}>
      <HeaderTitle sx={{ flexGrow: 1 }} />

      <IconButton
        size="sm"
        sx={{ order: { sm: 5 } }}
        component={Link}
        to="/new"
      >
        <ReplayIcon />
      </IconButton>
    </Stack>
  </HeaderContainer>
);

export default Header;
