import { useContext } from "react";
import { FormattedMessage } from "react-intl";

import AdsClickIcon from "@mui/icons-material/AdsClick";
import TouchAppIcon from "@mui/icons-material/TouchApp";

import TutorialContext from "@/components/contexts/TutorialContext";
import { isTouchDevice } from "@/utils/device";

import TutorialTooltip, { TutorialTooltipProps } from "./TutorialTooltip";

interface AddDwellerTooltipProps
  extends Omit<TutorialTooltipProps, "open" | "icon" | "text"> {
  disabled?: boolean;
}

const AddDwellerTooltip: React.FC<AddDwellerTooltipProps> = ({
  disabled,
  ...otherProps
}) => {
  const { showAddDwellerTooltip } = useContext(TutorialContext);

  return (
    <TutorialTooltip
      {...otherProps}
      open={showAddDwellerTooltip && !disabled}
      icon={isTouchDevice ? TouchAppIcon : AdsClickIcon}
      text={
        isTouchDevice ? (
          <FormattedMessage
            id="AddDwellerTooltipProps.title.tap"
            defaultMessage="Tap any of these buttons to add dwellers to this tree."
          />
        ) : (
          <FormattedMessage
            id="AddDwellerTooltipProps.title.click"
            defaultMessage="Click on any of these buttons to add dwellers to this tree."
          />
        )
      }
    />
  );
};

export default AddDwellerTooltip;
