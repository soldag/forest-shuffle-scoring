import { useContext } from "react";
import { FormattedMessage } from "react-intl";

import AdsClickIcon from "@mui/icons-material/AdsClick";
import TouchAppIcon from "@mui/icons-material/TouchApp";

import TutorialContext from "@/components/contexts/TutorialContext";
import { isTouchDevice } from "@/utils/device";

import TutorialTooltip, { TutorialTooltipProps } from "./TutorialTooltip";

interface AddTreeTooltipProps
  extends Omit<TutorialTooltipProps, "open" | "icon" | "text"> {
  disabled?: boolean;
}

const AddTreeTooltip = ({ disabled, ...otherProps }: AddTreeTooltipProps) => {
  const { showAddTreeTooltip } = useContext(TutorialContext);

  return (
    <TutorialTooltip
      {...otherProps}
      open={showAddTreeTooltip && !disabled}
      icon={isTouchDevice ? TouchAppIcon : AdsClickIcon}
      text={
        isTouchDevice ? (
          <FormattedMessage
            id="AddTreeTooltipProps.title.tap"
            defaultMessage="Tap here to add a tree."
          />
        ) : (
          <FormattedMessage
            id="AddTreeTooltipProps.title.click"
            defaultMessage="Click here to add a tree."
          />
        )
      }
    />
  );
};

export default AddTreeTooltip;
