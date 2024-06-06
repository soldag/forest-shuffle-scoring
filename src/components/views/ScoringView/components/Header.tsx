import { Link } from "wouter";

import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, Stack } from "@mui/joy";

import HeaderTitle from "@/components/common/HeaderTitle";

const Header = () => (
  <Stack direction="row" alignItems="center" columnGap={2}>
    <HeaderTitle sx={{ flexGrow: 1 }} />

    <IconButton size="sm" sx={{ order: { sm: 5 } }} component={Link} to="/new">
      <ReplayIcon />
    </IconButton>
  </Stack>
);

export default Header;
