import QrScanner from "qr-scanner";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSearch } from "wouter";

import { useTheme } from "@mui/joy";
import { Breakpoints } from "@mui/system";

export const useBreakpoint = (
  querySelector: (breakpoints: Breakpoints) => string,
) => {
  const theme = useTheme();
  const query = querySelector(theme.breakpoints).replace("@media", "");
  return useMediaQuery(query);
};

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export const useHasCamera = (): boolean | null => {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);

  useEffect(() => {
    QrScanner.hasCamera()
      .then(setHasCamera)
      .catch((error) =>
        console.error("Failed to check camera availability:", error),
      );
  }, []);

  return hasCamera;
};

export const useSearchParam = (name: string) => {
  const searchString = useSearch();

  const value = useMemo(() => {
    const searchParams = new URLSearchParams(searchString);
    return searchParams.get(name) || null;
  }, [searchString, name]);

  const setValue = useCallback(
    (newValue: string | null) => {
      const url = new URL(window.location.href);
      if (newValue != null) {
        url.searchParams.set(name, newValue);
      } else {
        url.searchParams.delete(name);
      }

      window.history.replaceState(null, "", url);
    },
    [name],
  );

  return [value, setValue] as [string | null, (value: string | null) => void];
};
