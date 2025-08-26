import * as _ from "lodash-es";

import { Option, Select, SelectProps, Typography } from "@mui/joy";

import { Locale } from "@/types";

interface LocaleOptions {
  flag: string;
  label: string;
}

const OPTIONS: Record<Locale, LocaleOptions> = {
  [Locale.De]: {
    flag: "🇩🇪",
    label: "Deutsch",
  },
  [Locale.En]: {
    flag: "🇺🇸",
    label: "English",
  },
  [Locale.Nl]: {
    flag: "🇳🇱",
    label: "Nederlands",
  },
  [Locale.PtBr]: {
    flag: "🇧🇷",
    label: "Português - Brasil",
  },
};

const SORTED_OPTIONS = _.orderBy(
  Object.entries(OPTIONS).map(([code, options]) => ({ code, ...options })),
  (l) => l.label,
);

const LocaleSelect = (props: SelectProps<Locale, false>) => (
  <Select {...props}>
    {SORTED_OPTIONS.map(({ code, flag, label }) => (
      <Option key={code} value={code} label={flag}>
        <Typography startDecorator={flag}>{label}</Typography>
      </Option>
    ))}
  </Select>
);

export default LocaleSelect;
