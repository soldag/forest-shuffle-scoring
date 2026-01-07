import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { DialogContent, DialogTitle, ModalClose } from "@mui/joy";

import CardSelect from "@/components/common/CardSelect";
import ResponsiveDrawer from "@/components/common/ResponsiveDrawer";
import { Card, GameBox, TreeSymbol } from "@/game";

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
  const [treeSymbol, setTreeSymbol] = useState<TreeSymbol | null | undefined>(
    selectedCard?.treeSymbol,
  );

  useEffect(() => {
    setCardName(selectedCard?.name);
    setGameBox(selectedCard?.gameBox);
    setTreeSymbol(selectedCard?.treeSymbol);
  }, [open, selectedCard]);

  return (
    <ResponsiveDrawer
      open={open}
      onClose={onClose}
      sx={{
        "--Drawer-verticalSize": "min(571px, 65%)",
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
          onSelect={onSelectCard}
          canRemove={!!selectedCard}
          onRemove={onRemoveCard}
          open={open}
        />
      </DialogContent>
    </ResponsiveDrawer>
  );
};

export default CardDrawer;
