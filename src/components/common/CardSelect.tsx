import * as _ from "lodash-es";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import CardButton from "@/components/common/CardButton";
import TreeSymbolButton from "@/components/common/TreeSymbolButton";
import { Card, CardType, TreeSymbol } from "@/game";
import { getLocalizedCardName } from "@/translations/messages/CardNames";
import { getLocalizedTreeSymbol } from "@/translations/messages/TreeSymbols";

interface CardSelectProps<TCard extends Card> {
  sx?: SxProps;
  cards: TCard[];
  cardName?: string;
  onCardNameChange: (value?: string) => void;
  treeSymbol?: TreeSymbol;
  onTreeSymbolChange: (value?: TreeSymbol) => void;
  onSelect?: (value: TCard) => void;
  canRemove?: boolean;
  onRemove?: () => void;
}

const CardSelect = <TCard extends Card>({
  sx,
  cards,
  cardName,
  onCardNameChange,
  treeSymbol,
  onTreeSymbolChange,
  onSelect,
  canRemove = false,
  onRemove,
}: CardSelectProps<TCard>) => {
  const intl = useIntl();

  const cardNameOptions = _.chain(cards)
    .uniqBy((c) => c.name)
    .orderBy((c) => [c.types, getLocalizedCardName(intl, c.name) ?? c.name])
    .value();

  const treeSymbolOptions = _.chain(cards)
    .filter((c) => c.name === cardName && !!c.treeSymbol)
    .uniqBy((c) => c.treeSymbol)
    .sortBy((c) => getLocalizedTreeSymbol(intl, c.treeSymbol!))
    .value();
  const canSelectTreeSymbol =
    cardName &&
    treeSymbolOptions?.length > 0 &&
    !cards.some((c) => c.types.includes(CardType.Tree));

  useEffect(() => {
    if (cardName && !cards.some((c) => c.name === cardName)) {
      onCardNameChange(undefined);
    }
  }, [cards, cardName, onCardNameChange]);

  const handleSelectCardName = (value: TCard) => {
    onCardNameChange(value.name);
    if (!value.treeSymbol || value.types.includes(CardType.Tree)) {
      onSelect?.(value);
    }
  };

  const handleResetCardName = () => {
    onCardNameChange(undefined);
    onTreeSymbolChange(undefined);
  };

  const handleSelectTreeSymbol = (value: TCard) => {
    onTreeSymbolChange(value?.treeSymbol);
    onSelect?.(value);
  };

  const handleResetTreeSymbol = () => {
    onTreeSymbolChange(undefined);
  };

  return (
    <Stack direction="column" gap={2} justifyContent="space-between" sx={sx}>
      <Stack direction="column" gap={1}>
        <Typography level="title-sm">
          <FormattedMessage
            id="CardSelect.header.cardName"
            defaultMessage="Card"
          />
        </Typography>
        {cardName ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="body-sm">
              {getLocalizedCardName(intl, cardName) ?? cardName}
            </Typography>
            <IconButton size="sm" onClick={handleResetCardName}>
              <EditIcon />
            </IconButton>
          </Stack>
        ) : (
          cardNameOptions.map((card) => (
            <CardButton
              key={card.name}
              size="sm"
              card={card}
              onClick={() => handleSelectCardName(card)}
            />
          ))
        )}

        {canSelectTreeSymbol && (
          <>
            <Typography level="title-sm">
              <FormattedMessage
                id="CardSelect.header.treeSymbol"
                defaultMessage="Tree symbol"
              />
            </Typography>
            {treeSymbol ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography level="body-sm">
                  {getLocalizedTreeSymbol(intl, treeSymbol)}
                </Typography>
                <IconButton size="sm" onClick={handleResetTreeSymbol}>
                  <EditIcon />
                </IconButton>
              </Stack>
            ) : (
              treeSymbolOptions.map((card) => (
                <TreeSymbolButton
                  key={card.treeSymbol}
                  size="sm"
                  treeSymbol={card.treeSymbol!}
                  onClick={() => handleSelectTreeSymbol(card)}
                />
              ))
            )}
          </>
        )}
      </Stack>

      {canRemove && (
        <Button size="sm" color="danger" onClick={onRemove}>
          <FormattedMessage
            id="CardSelect.remove"
            defaultMessage="Remove card"
          />
        </Button>
      )}
    </Stack>
  );
};

export default CardSelect;
