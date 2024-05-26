import { Drawer, DrawerProps, Sheet } from "@mui/joy";

import { useBreakpoint } from "@/utils/hooks";

type Anchor = "left" | "top" | "right" | "bottom";
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

interface ResponsiveDrawerProps extends Omit<DrawerProps, "anchor"> {
  anchorSmall?: Anchor;
  anchorBig?: Anchor;
  breakpoint?: Breakpoint;
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({
  anchorSmall = "bottom",
  anchorBig = "right",
  breakpoint = "sm",
  children,
  ...otherProps
}) => {
  const showSmallVariant = useBreakpoint((breakpoints) =>
    breakpoints.down(breakpoint),
  );

  return showSmallVariant ? (
    <Drawer {...otherProps} anchor={anchorSmall}>
      {children}
    </Drawer>
  ) : (
    <Drawer
      {...otherProps}
      anchor={anchorBig}
      slotProps={{
        content: {
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            p: { md: 3 },
          },
        },
      }}
    >
      <Sheet
        sx={{
          borderRadius: { md: "md" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
          overflow: "auto",
          p: 2,
        }}
      >
        {children}
      </Sheet>
    </Drawer>
  );
};

export default ResponsiveDrawer;
