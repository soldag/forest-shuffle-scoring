import { MessageDescriptor, defineMessages } from "react-intl";

export default defineMessages<string, MessageDescriptor | undefined>({
  required: {
    id: "FormValidation.required",
    defaultMessage: "This field is required.",
  },
  minLength: {
    id: "FormValidation.minLength",
    defaultMessage: "This field must contain at least {value} characters.",
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
