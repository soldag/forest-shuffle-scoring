import React, { ReactNode } from "react";

import { Box, Sheet } from "@mui/joy";

interface ViewProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

const View: React.FC<ViewProps> = ({ header, footer, children }) => (
  <Sheet
    sx={{
      height: "100dvh",
      width: "100dvw",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      overscrollBehavior: "none",
      boxSizing: "border-box",
    }}
  >
    {header}
    <Box
      sx={{
        flexGrow: 1,
        flexShrink: 1,
        py: 2,
        overflowY: "scroll",
      }}
    >
      {children}
    </Box>
    {footer}
  </Sheet>
);

export default View;
