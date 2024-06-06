import { useContext } from "react";
import { FormattedMessage } from "react-intl";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";

import TutorialTooltip, {
  TutorialTooltipProps,
} from "@/components/common/tutorial/TutorialTooltip";
import TutorialContext from "@/components/contexts/TutorialContext";
import { isTouchDevice } from "@/utils/device";
import { useBreakpoint } from "@/utils/hooks";

interface SwipeToAddTreeTooltipProps
  extends Omit<TutorialTooltipProps, "open" | "icon" | "text"> {
  disabled?: boolean;
}

const SwipeToAddTreeTooltip = ({
  disabled,
  ...otherProps
}: SwipeToAddTreeTooltipProps) => {
  const { showSwipeToAddTreeTooltip } = useContext(TutorialContext);
  const isScreenXs = useBreakpoint((breakpoints) => breakpoints.only("xs"));

  return (
    <TutorialTooltip
      {...otherProps}
      open={!disabled && showSwipeToAddTreeTooltip && isScreenXs}
      icon={isTouchDevice ? SwipeLeftIcon : KeyboardDoubleArrowRightIcon}
      text={
        isTouchDevice ? (
          <FormattedMessage
            id="SwipeToAddTreeTooltip.title.tap"
            defaultMessage="Swipe left to add more trees."
          />
        ) : (
          <FormattedMessage
            id="SwipeToAddTreeTooltip.title.click"
            defaultMessage="Scroll right to add more trees."
          />
        )
      }
    />
  );
};

export default SwipeToAddTreeTooltip;
