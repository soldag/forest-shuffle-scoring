import { ReactNode } from "react";

import { Box, Container, Sheet } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { mergeSx } from "@/utils/sx";

interface ContentContainerProps {
  children: ReactNode;
  disableGutters?: boolean;
  sx?: SxProps;
}

const ContentContainer = ({
  children,
  disableGutters = false,
  sx,
}: ContentContainerProps) => (
  <Box
    sx={mergeSx(sx, {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "background.surface",
      p: disableGutters ? 0 : 2,
    })}
  >
    <Container disableGutters sx={{ flexGrow: 1 }}>
      {children}
    </Container>
  </Box>
);

interface ViewProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  disableGutters?: boolean;
}

const View = ({
  header,
  footer,
  children,
  disableGutters = false,
}: ViewProps) => (
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
    {header && (
      <ContentContainer
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          boxShadow: "sm",
          zIndex: 2,
        }}
      >
        {header}
      </ContentContainer>
    )}

    <ContentContainer
      sx={{
        flexGrow: 1,
        flexShrink: 1,
        overflowY: "auto",
        zIndex: 1,
      }}
      disableGutters={disableGutters}
    >
      {children}
    </ContentContainer>

    {footer && (
      <ContentContainer
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          boxShadow: "smInverse",
          zIndex: 2,
        }}
      >
        {footer}
      </ContentContainer>
    )}
  </Sheet>
);

export default View;
