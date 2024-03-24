import React, { ReactNode } from "react";

import { Box, Container } from "@mui/joy";

interface HeaderContainerProps {
  children: ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => (
  <Box
    sx={{
      bgcolor: "background.surface",
      borderBottom: "1px solid",
      borderColor: "divider",
      boxShadow: "sm",
      p: 2,
    }}
  >
    <Container sx={{ px: { xs: 0 } }}>{children}</Container>
  </Box>
);

export default HeaderContainer;
