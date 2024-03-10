import React, { ReactNode } from "react";

import { Box, Container } from "@mui/joy";

interface FooterContainerProps {
  children: ReactNode;
}

const FooterContainer: React.FC<FooterContainerProps> = ({ children }) => (
  <Box
    sx={{
      bgcolor: "background.surface",
      borderTop: "1px solid",
      borderColor: "divider",
      boxShadow: "sm",
      p: 2,
      mt: 2,
    }}
  >
    <Container sx={{ px: { xs: 0 } }}>{children}</Container>
  </Box>
);

export default FooterContainer;
