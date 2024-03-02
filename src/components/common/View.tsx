import React, { ReactNode } from "react";

import { Box, Sheet } from "@mui/joy";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

interface ViewProps {
  children?: ReactNode;
}

const View: React.FC<ViewProps> = ({ children }) => (
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
    <Header />
    <Box sx={{ flexGrow: 1 }}>{children}</Box>
    <Footer />
  </Sheet>
);

export default View;
