import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { DialogContent, DialogTitle, ModalClose } from "@mui/joy";

import CardSelect from "@/components/common/CardSelect";
import ResponsiveDrawer from "@/components/common/ResponsiveDrawer";
import { Card, GameBox, TreeSymbol } from "@/game";

const transitionDuration = 300;

interface CardDrawerProps<TCard extends Card> {
  action: "add" | "exchange";
  open: boolean;
  onClose: () => void;
  cards: TCard[];
  selectedCard?: TCard | null;
  onSelectCard?: (card: TCard) => void;
  onRemoveCard?: () => void;
}

const CardDrawer = <TCard extends Card>({
  action,
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
  const [gameBox, setGameBox] = useState<GameBox | undefined>(
    selectedCard?.gameBox,
  );
  const [treeSymbol, setTreeSymbol] = useState<TreeSymbol | undefined>(
    selectedCard?.treeSymbol,
  );

  useEffect(() => {
    setCardName(selectedCard?.name);
    setGameBox(selectedCard?.gameBox);
    setTreeSymbol(selectedCard?.treeSymbol);
  }, [open, selectedCard]);

  const handleSelectCard = (card: TCard) => {
    setTimeout(() => onSelectCard?.(card), transitionDuration);
    onClose();
  };

  const handleRemoveCard = () => {
    setTimeout(() => onRemoveCard?.(), transitionDuration);
    onClose();
  };

  return (
    <ResponsiveDrawer
      anchorSmall="bottom"
      anchorBig="right"
      breakpoint="sm"
      size="sm"
      open={open}
      onClose={onClose}
      sx={{
        "--Drawer-horizontalSize": "400px",
        "--Drawer-verticalSize": "min(571px, 65%)",
        "--Drawer-transitionDuration": `${transitionDuration}ms`,
      }}
    >
      <ModalClose />
      <DialogTitle>
        {action === "add" && (
          <FormattedMessage
            id="CardDrawer.title.add"
            defaultMessage="Add card"
          />
        )}
        {action === "exchange" && (
          <FormattedMessage
            id="CardDrawer.title.exchange"
            defaultMessage="Exchange card"
          />
        )}
      </DialogTitle>
      <DialogContent sx={{ m: 1.5 }}>
        <CardSelect
          sx={{ height: "100%" }}
          cards={cards}
          cardName={cardName}
          onCardNameChange={setCardName}
          gameBox={gameBox}
          onGameBoxChange={setGameBox}
          treeSymbol={treeSymbol}
          onTreeSymbolChange={setTreeSymbol}
          onSelect={handleSelectCard}
          canRemove={!!selectedCard}
          onRemove={handleRemoveCard}
        />
      </DialogContent>
    </ResponsiveDrawer>
  );
};

export default CardDrawer;
