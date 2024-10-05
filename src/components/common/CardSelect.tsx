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
import ExpansionButton from "@/components/common/GameBoxButton";
import TreeSymbolButton from "@/components/common/TreeSymbolButton";
import {
  Card,
  CardType,
  EXPANSION_CARD_TYPES,
  GameBox,
  TreeSymbol,
} from "@/game";
import { getLocalizedCardName } from "@/translations/messages/CardNames";
import CardTypeMessages from "@/translations/messages/CardTypes";
import GameBoxMessages from "@/translations/messages/GameBoxes";
import TreeSymbolMessages from "@/translations/messages/TreeSymbols";

const getOptions = <TCard extends Card, TValue extends string>(
  cards: TCard[],
  valueSelector: (card: TCard) => TValue | undefined,
  messageSelector: (value: TValue) => string,
  filters: { cardName?: string; gameBox?: GameBox } = {},
) => {
  const matchingCards = cards
    .filter((c) => !("cardName" in filters) || c.name === filters.cardName)
    .filter((c) => !("gameBox" in filters) || c.gameBox === filters.gameBox)
    .filter((c) => !!valueSelector(c));

  return _.orderBy(_.uniqBy(matchingCards, valueSelector), (c) =>
    messageSelector(valueSelector(c)!),
  );
};

const getUnique = <T,>(cards: Card[], selector: (card: Card) => T) => {
  const uniqueValues = _.uniq(cards.map(selector));
  if (uniqueValues.length === 1) {
    return uniqueValues[0];
  }
};

interface CardSelectProps<TCard extends Card> {
  sx?: SxProps;
  cards: TCard[];
  cardName?: string;
  onCardNameChange: (value?: string) => void;
  gameBox?: GameBox;
  onGameBoxChange: (value?: GameBox) => void;
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
  gameBox,
  onGameBoxChange,
  treeSymbol,
  onTreeSymbolChange,
  onSelect,
  canRemove = false,
  onRemove,
}: CardSelectProps<TCard>) => {
  const intl = useIntl();

  const cardNameOptions = getOptions(
    cards,
    (c) => c.name,
    (n) => getLocalizedCardName(intl, n) ?? n,
  );

  const cardNameOptionsByType = _.groupBy(
    cardNameOptions,
    (c) => c.types.filter((t) => !EXPANSION_CARD_TYPES.includes(t))[0],
  ) as { [key in CardType]: TCard[] };

  const sortedCardTypes = _.orderBy(
    Object.keys(cardNameOptionsByType) as CardType[],
    (t) => intl.formatMessage(CardTypeMessages[t].plural),
  );

  const gameBoxOptions = getOptions(
    cards,
    (c) => c.gameBox,
    (g) => intl.formatMessage(GameBoxMessages[g]),
    { cardName },
  );
  const canSelectGameBox = cardName && gameBoxOptions.length > 1;

  const treeSymbolOptions = getOptions(
    cards,
    (c) => c.treeSymbol,
    (t) => intl.formatMessage(TreeSymbolMessages[t]),
    { cardName, gameBox },
  );
  const canSelectTreeSymbol = gameBox && treeSymbolOptions.length > 1;

  useEffect(() => {
    if (cardName && !cards.some((c) => c.name === cardName)) {
      onCardNameChange(undefined);
      onGameBoxChange(undefined);
      onTreeSymbolChange(undefined);
    }
  }, [cards, cardName, onCardNameChange, onGameBoxChange, onTreeSymbolChange]);

  const handleSelect = (
    newCardName: string,
    newGameBox?: GameBox,
    newTreeSymbol?: TreeSymbol,
  ) => {
    let candidates = cards.filter((c) => c.name === newCardName);

    newGameBox = newGameBox ?? getUnique(candidates, (c) => c.gameBox);
    if (newGameBox) {
      candidates = candidates.filter((c) => c.gameBox === newGameBox);
    }

    newTreeSymbol = newTreeSymbol ?? getUnique(candidates, (c) => c.treeSymbol);
    if (newTreeSymbol) {
      candidates = candidates.filter((c) => c.treeSymbol === newTreeSymbol);
    }
    const hasNoTreeSymbols = candidates.every((c) => !c.treeSymbol);

    if (newCardName !== cardName) {
      onCardNameChange(newCardName);
    }
    if (newGameBox && newGameBox !== gameBox) {
      onGameBoxChange(newGameBox);
    }
    if ((hasNoTreeSymbols || newTreeSymbol) && newTreeSymbol !== treeSymbol) {
      onTreeSymbolChange(treeSymbol);
    }
    if (
      newCardName &&
      newGameBox &&
      (hasNoTreeSymbols || newTreeSymbol) &&
      candidates.length > 0
    ) {
      onSelect?.(candidates[0]);
    }
  };

  const handleSelectCardName = (value: TCard) => {
    handleSelect(value.name);
  };

  const handleResetCardName = () => {
    onCardNameChange(undefined);
    onGameBoxChange(undefined);
    onTreeSymbolChange(undefined);
  };

  const handleSelectGameBox = (value: TCard) => {
    handleSelect(value.name, value.gameBox);
  };

  const handleResetGameBox = () => {
    onGameBoxChange(undefined);
    onTreeSymbolChange(undefined);
  };

  const handleSelectTreeSymbol = (value: TCard) => {
    handleSelect(value.name, value.gameBox, value.treeSymbol);
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
              "--ListItem-stickyTop": "-1px",
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

        {canSelectGameBox && (
          <>
            <Typography level="title-sm">
              <FormattedMessage
                id="CardSelect.header.expansion"
                defaultMessage="Expansion"
              />
            </Typography>
            {gameBox ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography level="body-sm">
                  {intl.formatMessage(GameBoxMessages[gameBox])}
                </Typography>
                <IconButton size="sm" onClick={handleResetGameBox}>
                  <EditIcon />
                </IconButton>
              </Stack>
            ) : (
              gameBoxOptions.map((card) => (
                <ExpansionButton
                  key={card.gameBox}
                  size="sm"
                  gameBox={card.gameBox}
                  onClick={() => handleSelectGameBox(card)}
                />
              ))
            )}
          </>
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
