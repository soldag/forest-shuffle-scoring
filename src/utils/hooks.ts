import { useCallback, useEffect, useMemo, useRef } from "react";
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

  return ref.current;
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
