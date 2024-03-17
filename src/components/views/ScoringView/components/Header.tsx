import React, { useContext } from "react";

import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, Stack } from "@mui/joy";

import { resetGame } from "@/components/actions/game";
import HeaderContainer from "@/components/common/HeaderContainer";
import HeaderTitle from "@/components/common/HeaderTitle";
import GameContext from "@/components/contexts/GameContext";

const Header: React.FC = () => {
  const { dispatch } = useContext(GameContext);

  const handleReset = () => dispatch(resetGame());

  return (
    <HeaderContainer>
      <Stack direction="row" alignItems="center" columnGap={2}>
        <HeaderTitle sx={{ flexGrow: 1 }} />

        <IconButton size="sm" sx={{ order: { sm: 5 } }} onClick={handleReset}>
          <ReplayIcon />
        </IconButton>
      </Stack>
    </HeaderContainer>
  );
};

export default Header;
