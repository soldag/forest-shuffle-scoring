import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";

import { Box, useTheme } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";

import appIconUrl from "@/assets/images/appIcon.svg?url";

interface ResponsiveQrCodeProps {
  data: string;
  sx?: SxProps;
}

const ResponsiveQrCode = ({ data, sx }: ResponsiveQrCodeProps) => {
  const theme = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling());

  useEffect(() => {
    qrCode.current.update({
      data,
      type: "svg",
      width: 1024,
      height: 1024,
      image: appIconUrl,
      dotsOptions: {
        // Forcing the light theme, because the dark theme's color is too light for the QR code to be scanned consistently.
        color: theme.colorSchemes.light.palette.neutral.plainColor,
        type: "extra-rounded",
      },
      cornersSquareOptions: {
        color: theme.colorSchemes.light.palette.primary.plainColor,
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: theme.colorSchemes.light.palette.neutral.plainColor,
        type: "extra-rounded",
      },
      imageOptions: {
        imageSize: 0.3,
        margin: 25,
      },
    });
    qrCode.current.applyExtension((svg) => {
      svg.style.width = "100%";
      svg.style.height = "100%";
    });

    if (containerRef.current) {
      containerRef.current?.replaceChildren();
      qrCode.current.append(containerRef.current);
    }
  }, [data, theme]);

  return (
    <Box
      sx={{
        maxHeight: "100%",
        maxWidth: "100%",
        ...sx,
      }}
    >
      <div
        ref={containerRef}
        style={{ aspectRatio: "1/1", maxHeight: "100%", maxWidth: "100%" }}
      />
    </Box>
  );
};

export default ResponsiveQrCode;
