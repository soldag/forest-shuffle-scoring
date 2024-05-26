import * as _ from "lodash-es";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import CardButton from "@/components/common/CardButton";
import TreeSymbolButton from "@/components/common/TreeSymbolButton";
import { Card, CardType, EXPANSION_CARD_TYPES, TreeSymbol } from "@/game";
import { getLocalizedCardName } from "@/translations/messages/CardNames";
import CardTypeMessages from "@/translations/messages/CardTypes";
import TreeSymbolMessages from "@/translations/messages/TreeSymbols";

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

  const cardNameOptions = _.orderBy(
    _.uniqBy(cards, (c) => c.name),
    (c) => getLocalizedCardName(intl, c.name) ?? c.name,
  );
  const cardNameOptionsByType = _.groupBy(
    cardNameOptions,
    (c) => c.types.filter((t) => !EXPANSION_CARD_TYPES.includes(t))[0],
  ) as { [key in CardType]: TCard[] };

  const sortedCardTypes = _.orderBy(
    Object.keys(cardNameOptionsByType) as CardType[],
    (t) => intl.formatMessage(CardTypeMessages[t].plural),
  );

  const treeSymbolOptions = _.orderBy(
    _.uniqBy(
      cards.filter((c) => c.name === cardName && !!c.treeSymbol),
      (c) => c.treeSymbol,
    ),
    (c) => intl.formatMessage(TreeSymbolMessages[c.treeSymbol!]),
  );
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
      <Stack direction="column" gap={1} sx={{ flex: "1 1" }}>
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
          <List
            sx={(theme) => ({
              "--List-padding": 0,
              "--ListItem-paddingX": 0,
              "--ListItem-stickyBackground": theme.palette.background.surface,
              "flex": "1 1 0",
              "overflowY": "auto",
            })}
          >
            {sortedCardTypes.map((type) => (
              <ListItem nested key={type}>
                {Object.keys(cardNameOptionsByType).length > 1 && (
                  <ListSubheader sticky>
                    {intl.formatMessage(CardTypeMessages[type].plural)}
                  </ListSubheader>
                )}
                {cardNameOptionsByType[type].map((card) => (
                  <ListItem key={card.name}>
                    <CardButton
                      fullWidth
                      size="sm"
                      card={card}
                      onClick={() => handleSelectCardName(card)}
                    />
                  </ListItem>
                ))}
              </ListItem>
            ))}
          </List>
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
                  {intl.formatMessage(TreeSymbolMessages[treeSymbol])}
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
