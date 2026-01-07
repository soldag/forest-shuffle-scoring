import * as _ from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Stack,
  Typography,
  Input,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import CardButton from "@/components/common/CardButton";
import ExpansionButton from "@/components/common/GameBoxButton";
import TreeSymbolButton from "@/components/common/TreeSymbolButton";
import {
  Card,
  CardType,
  EXPANSION_CARD_TYPES,
  EXPANSION_GAME_BOXES,
  GAME_BOX_PRIORITIES,
  GameBox,
  TreeSymbol,
} from "@/game";
import { getLocalizedCardName } from "@/translations/messages/CardNames";
import CardTypeMessages from "@/translations/messages/CardTypes";
import GameBoxMessages from "@/translations/messages/GameBoxes";
import TreeSymbolMessages from "@/translations/messages/TreeSymbols";

const getOptions = <TCard extends Card, TValue extends string>(
  cards: TCard[],
  valueSelector: (card: TCard) => TValue | null | undefined,
  messageSelector: (value: TValue) => string,
  filters: {
    cardName?: string;
    treeSymbol?: TreeSymbol | null;
    gameBox?: GameBox;
  } = {},
  sortKeySelector?: (value: TValue, message: string) => unknown,
) => {
  const { cardName, treeSymbol, gameBox } = filters;
  const matchingCards = cards.filter(
    (c) =>
      !!valueSelector(c) &&
      (cardName === undefined || c.name === cardName) &&
      (treeSymbol === undefined || c.treeSymbol === treeSymbol) &&
      (gameBox === undefined || c.gameBox === gameBox),
  );

  return _.orderBy(_.uniqBy(matchingCards, valueSelector), (c) => {
    const value = valueSelector(c)!;
    const message = messageSelector(value);
    return sortKeySelector ? sortKeySelector(value, message) : message;
  });
};

const getUnique = <T,>(cards: Card[], selector: (card: Card) => T) => {
  const uniqueValues = _.uniq(cards.map(selector));
  if (uniqueValues.length === 1) {
    return uniqueValues[0];
  }
};

const getPreselectedGameBox = (cards: Card[]): GameBox | undefined => {
  // If all cards match in their types and tree symbol, the game box
  // doesn't matter and can be preselected based on the priority
  const comparator = (a: Card, b: Card) =>
    _.isEqual(a.types, b.types) && a.treeSymbol === b.treeSymbol;

  if (_.uniqWith(cards, comparator).length === 1) {
    return _.sortBy(
      cards.map((c) => c.gameBox),
      (g) => GAME_BOX_PRIORITIES[g],
    )[0];
  }
};

interface CardSelectProps<TCard extends Card> {
  sx?: SxProps;
  cards: TCard[];
  cardName?: string;
  onCardNameChange: (value?: string) => void;
  gameBox?: GameBox;
  onGameBoxChange: (value?: GameBox) => void;
  treeSymbol?: TreeSymbol | null;
  onTreeSymbolChange: (value?: TreeSymbol | null) => void;
  onSelect?: (value: TCard) => void;
  canRemove?: boolean;
  onRemove?: () => void;
  open?: boolean;
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
  open,
}: CardSelectProps<TCard>) => {
  const intl = useIntl();

  const [search, setSearch] = useState('');

  const cardNameOptions = getOptions(
    cards,
    (c) => c.name,
    (n) => getLocalizedCardName(intl, n) ?? n,
  ).filter(card =>
    getLocalizedCardName(intl, card.name)!
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const cardNameOptionsByType = _.groupBy(
    cardNameOptions,
    (c) => c.types.filter((t) => !EXPANSION_CARD_TYPES.includes(t))[0],
  ) as { [key in CardType]: TCard[] };

  const sortedCardTypes = _.orderBy(
    Object.keys(cardNameOptionsByType) as CardType[],
    (t) => intl.formatMessage(CardTypeMessages[t].plural),
  );

  const treeSymbolOptions = getOptions(
    cards,
    (c) => c.treeSymbol,
    (t) => intl.formatMessage(TreeSymbolMessages[t]),
    { cardName },
  );
  const canSelectTreeSymbol = cardName && treeSymbolOptions.length > 1;

  const gameBoxOptions = getOptions(
    cards,
    (c) => c.gameBox,
    (g) => intl.formatMessage(GameBoxMessages[g]),
    { cardName, treeSymbol },
    (value, message) => [EXPANSION_GAME_BOXES.includes(value), message],
  );
  const canSelectGameBox =
    treeSymbol !== undefined && gameBoxOptions.length > 1;

  useEffect(() => {
    if (cardName && !cards.some((c) => c.name === cardName)) {
      onCardNameChange(undefined);
      onTreeSymbolChange(undefined);
      onGameBoxChange(undefined);
    }
  }, [cards, cardName, onCardNameChange, onGameBoxChange, onTreeSymbolChange]);

  const handleSelect = (
    newCardName: string,
    newTreeSymbol?: TreeSymbol | null,
    newGameBox?: GameBox,
  ) => {
    let candidates = cards.filter((c) => c.name === newCardName);

    newTreeSymbol = newTreeSymbol ?? getUnique(candidates, (c) => c.treeSymbol);
    if (newTreeSymbol) {
      candidates = candidates.filter((c) => c.treeSymbol === newTreeSymbol);
    }

    newGameBox =
      newGameBox ??
      getUnique(candidates, (c) => c.gameBox) ??
      getPreselectedGameBox(candidates);
    if (newGameBox) {
      candidates = candidates.filter((c) => c.gameBox === newGameBox);
    }

    if (newCardName !== cardName) {
      onCardNameChange(newCardName);
    }
    if (newTreeSymbol !== undefined && newTreeSymbol !== treeSymbol) {
      onTreeSymbolChange(newTreeSymbol);
    }
    if (newGameBox !== undefined && newGameBox !== gameBox) {
      onGameBoxChange(newGameBox);
    }
    if (
      newCardName !== undefined &&
      newTreeSymbol !== undefined &&
      newGameBox !== undefined &&
      candidates.length > 0
    ) {
      onSelect?.(candidates[0]);
    }
  };

  const handleSelectCardName = (value: TCard) => {
    clearSearch();
    handleSelect(value.name);
  };

  const handleResetCardName = () => {
    onCardNameChange(undefined);
    onTreeSymbolChange(undefined);
    onGameBoxChange(undefined);
  };

  const handleSelectTreeSymbol = (value: TCard) => {
    handleSelect(value.name, value.treeSymbol);
  };

  const handleResetTreeSymbol = () => {
    onGameBoxChange(undefined);
    onTreeSymbolChange(undefined);
  };

  const handleSelectGameBox = (value: TCard) => {
    handleSelect(value.name, value.treeSymbol, value.gameBox);
  };

  const handleResetGameBox = () => {
    onGameBoxChange(undefined);
  };

  const searchRef = useRef<HTMLDivElement>(null);

  const clearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    if (open) {
      searchRef.current?.querySelector('input')!.focus();
    }
  }, [searchRef, open])

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
          <Stack direction="column" gap={2}>
            <Input
              ref={searchRef}
              endDecorator={
                <IconButton size="sm" onClick={clearSearch}>
                  <ClearIcon />
                </IconButton>
              }
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />

            <List
              sx={(theme) => ({
                "--List-padding": 0,
                "--ListItem-paddingX": 0,
                "--ListItem-stickyTop": "-1px",
                "--ListItem-stickyBackground": theme.palette.background.surface,
                "flex": "1 1",
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
          </Stack>
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
