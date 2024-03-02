import { ValidationRule } from "react-hook-form";
import { IntlShape } from "react-intl";

import FormValidationMessages from "@/translations/messages/FormValidation";

type PrimitiveRules = {
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
};

type LocalizedRules = {
  required?: ValidationRule<boolean>;
  min?: ValidationRule<number>;
  max?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  minLength?: ValidationRule<number>;
};

export const buildRules = (intl: IntlShape, rules: PrimitiveRules) =>
  Object.assign(
    {},
    ...Object.entries(rules)
      .filter(([key]) => FormValidationMessages[key] != null)
      .map(([key, value]) => ({
        [key]: {
          value,
          message: intl.formatMessage(FormValidationMessages[key]!, { value }),
        },
      })),
  ) as LocalizedRules;
