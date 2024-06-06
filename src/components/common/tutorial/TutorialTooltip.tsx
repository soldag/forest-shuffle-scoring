import { ComponentType, ReactElement, ReactNode } from "react";

import { Card, Stack, Tooltip, TooltipProps } from "@mui/joy";
import { SxProps } from "@mui/system";

interface IconProps {
  sx?: SxProps;
}

export interface TutorialTooltipProps extends Pick<TooltipProps, "placement"> {
  open: boolean;
  icon?: ComponentType<IconProps>;
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
        disablePortal
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
        sx={(theme) => ({
          "maxWidth": `calc(100vw - ${theme.spacing(4)})`,
          "transition": "opacity ease 500ms",
          "&[data-popper-reference-hidden]": {
            opacity: 0,
          },
        })}
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
