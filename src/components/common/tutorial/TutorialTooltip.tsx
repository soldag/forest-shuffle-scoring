import { ReactElement, ReactNode } from "react";

import { Card, Stack, Tooltip, TooltipProps } from "@mui/joy";
import { SxProps, Theme } from "@mui/joy/styles/types";
import { SvgIcon } from "@mui/material";

type IconType = typeof SvgIcon;

export interface TutorialTooltipProps extends Pick<TooltipProps, "placement"> {
  open: boolean;
  icon?: IconType;
  text: ReactNode;
  children?: ReactElement;
}

const TutorialTooltip = ({
  open,
  icon: Icon,
  text,
  placement,
  children,
}: TutorialTooltipProps) => {
  const sx: SxProps = (theme: Theme) => ({
    "zIndex": 100,
    "maxWidth": `calc(100vw - ${theme.spacing(4)})`,
    "transition": "opacity ease 500ms",
    "&[data-popper-reference-hidden]": {
      opacity: 0,
    },
  });

  const content = (
    <Stack direction="row" alignItems="center" gap={0.5}>
      {Icon && (
        <Icon sx={{ color: "common.white", width: "1rem", height: "1rem" }} />
      )}
      {text}
    </Stack>
  );

  if (children) {
    return (
      <Tooltip
        arrow
        size="md"
        variant="solid"
        color="primary"
        title={content}
        placement={placement}
        open={open}
        modifiers={[
          {
            name: "hide",
          },
          {
            name: "preventOverflow",
            options: { padding: 16 },
          },
        ]}
        // For some reason, sx prop is passed down to
        // children, which is avoided by using slots
        slotProps={{
          // @ts-expect-error: even if not declared, sx is supported here
          root: { sx },
          arrow: { sx },
        }}
      >
        {children}
      </Tooltip>
    );
  }

  if (open) {
    return (
      <Card
        color="primary"
        size="sm"
        sx={{ px: 0.75, py: 0.5, boxShadow: "tooltip" }}
        variant="solid"
      >
        {content}
      </Card>
    );
  }

  return null;
};

export default TutorialTooltip;
