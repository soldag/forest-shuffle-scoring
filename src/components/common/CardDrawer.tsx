import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { DialogContent, DialogTitle, Drawer, ModalClose } from "@mui/joy";

import { Card, TreeSymbol } from "@/cards";
import CardSelect from "@/components/common/CardSelect";

const TRANSITION_DURATION = 300;

interface CardDrawerProps<TCard extends Card> {
  open: boolean;
  onClose: () => void;
  cards: TCard[];
  selectedCard?: TCard | null;
  onSelectCard?: (card: TCard) => void;
  onRemoveCard?: () => void;
}

const CardDrawer = <TCard extends Card>({
  open,
  onClose,
  cards,
  selectedCard,
  onSelectCard,
  onRemoveCard,
}: CardDrawerProps<TCard>) => {
  const [cardName, setCardName] = useState<string | undefined>(
    selectedCard?.name,
  );
  const [treeSymbol, setTreeSymbol] = useState<TreeSymbol | undefined>(
    selectedCard?.treeSymbol,
  );

  useEffect(() => {
    setCardName(selectedCard?.name);
    setTreeSymbol(selectedCard?.treeSymbol);
  }, [open, selectedCard]);

  const handleSelectCard = (card: TCard) => {
    setTimeout(() => onSelectCard?.(card), TRANSITION_DURATION);
    onClose();
  };

  const handleRemoveCard = () => {
    setTimeout(() => onRemoveCard?.(), TRANSITION_DURATION);
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      size="sm"
      open={open}
      onClose={onClose}
      sx={{ "--Drawer-transitionDuration": `${TRANSITION_DURATION}ms` }}
    >
      <ModalClose />
      <DialogTitle>
        <FormattedMessage id="CardDrawer.title" defaultMessage="Select card" />
      </DialogTitle>
      <DialogContent sx={{ m: 1 }}>
        <CardSelect
          sx={{ height: "100%" }}
          cards={cards}
          cardName={cardName}
          onCardNameChange={setCardName}
          treeSymbol={treeSymbol}
          onTreeSymbolChange={setTreeSymbol}
          onSelect={handleSelectCard}
          canRemove={!!selectedCard}
          onRemove={handleRemoveCard}
        />
      </DialogContent>
    </Drawer>
  );
};

export default CardDrawer;
