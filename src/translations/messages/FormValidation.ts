import { MessageDescriptor, defineMessages } from "react-intl";

export default defineMessages<string, MessageDescriptor | undefined>({
  required: {
    id: "FormValidation.required",
    defaultMessage: "This field is required.",
  },
  min: {
    id: "FormValidation.min",
    defaultMessage: "This value must be at least {value}.",
  },
  minLength: {
    id: "FormValidation.minLength",
    defaultMessage: "This field must contain at least {value} characters.",
  },
  max: {
    id: "FormValidation.max",
    defaultMessage: "This value must be no more than {value}.",
  },
  maxLength: {
    id: "FormValidation.maxLength",
    defaultMessage: "This field must be no longer than {value} characters.",
  },
  pattern: {
    id: "FormValidation.pattern",
    defaultMessage: "This value is invalid.",
  },
});
