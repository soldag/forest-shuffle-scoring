import { useContext } from "react";
import { FormattedMessage } from "react-intl";

import AdsClickIcon from "@mui/icons-material/AdsClick";
import TouchAppIcon from "@mui/icons-material/TouchApp";

import TutorialContext from "@/components/contexts/TutorialContext";
import { isTouchDevice } from "@/utils/device";

import TutorialTooltip, { TutorialTooltipProps } from "./TutorialTooltip";

interface ExchangeCardTooltipProps
  extends Omit<TutorialTooltipProps, "open" | "icon" | "text"> {
  disabled?: boolean;
}

const ExchangeCardTooltip = ({
  disabled,
  ...otherProps
}: ExchangeCardTooltipProps) => {
  const { showExchangeCardTooltip } = useContext(TutorialContext);

  return (
    <TutorialTooltip
      {...otherProps}
      open={showExchangeCardTooltip && !disabled}
      icon={isTouchDevice ? TouchAppIcon : AdsClickIcon}
      text={
        isTouchDevice ? (
          <FormattedMessage
            id="ExchangeCardTooltipProps.title.tap"
            defaultMessage="Tap a card to exchange or remove it."
          />
        ) : (
          <FormattedMessage
            id="ExchangeCardTooltipProps.title.click"
            defaultMessage="Click on a card to exchange or remove it."
          />
        )
      }
    />
  );
};

export default ExchangeCardTooltip;
