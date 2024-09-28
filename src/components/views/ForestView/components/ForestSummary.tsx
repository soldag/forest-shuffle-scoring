import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { useBoolean } from "usehooks-ts";

import EditIcon from "@mui/icons-material/Edit";
import { Link, Stack, Typography } from "@mui/joy";

import { Forest, getDwellersOfForest } from "@/game";
import { useBreakpoint } from "@/utils/hooks";

import CaveModal from "./CaveModal";

interface CardCountProps {
  label: ReactNode;
  value: number;
  endDecorator?: ReactNode;
}

const CardCount = ({ label, value, endDecorator }: CardCountProps) => {
  const isScreenXs = useBreakpoint((breakpoints) => breakpoints.only("xs"));

  return (
    <Typography level="body-sm">
      <Typography fontWeight="lg">{label}</Typography>{" "}
      <Typography endDecorator={endDecorator}>
        {isScreenXs ? (
          value
        ) : (
          <FormattedMessage
            id="ForestView.ForestSummary.CardCount.count"
            defaultMessage="{value, plural, =1 {#{nbsp}card} other {#{nbsp}cards}}"
            values={{ value, nbsp: <>&nbsp;</> }}
          />
        )}
      </Typography>
    </Typography>
  );
};

interface ForestSummaryProps {
  forest: Forest;
  onChange: (values: { caveCardCount: number }) => void;
}

const ForestSummary = ({ forest, onChange }: ForestSummaryProps) => {
  const {
    value: isCaveModalOpen,
    setTrue: openCaveModal,
    setFalse: closeCaveModal,
  } = useBoolean(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      gap={4}
    >
      <CardCount
        label={
          <FormattedMessage
            id="ForestView.ForestSummary.labels.woodyPlants"
            defaultMessage="Woody plants:"
          />
        }
        value={forest.woodyPlants.length}
      />
      <CardCount
        label={
          <FormattedMessage
            id="ForestView.ForestSummary.labels.dwellers"
            defaultMessage="Dwellers:"
          />
        }
        value={getDwellersOfForest(forest).length}
      />
      <CardCount
        label={
          <FormattedMessage
            id="ForestView.ForestSummary.labels.cave"
            defaultMessage="Cave:"
          />
        }
        value={forest.caveCardCount}
        endDecorator={
          <Link color="neutral" onClick={openCaveModal}>
            <EditIcon />
          </Link>
        }
      />

      <CaveModal
        open={isCaveModalOpen}
        count={forest.caveCardCount}
        onClose={closeCaveModal}
        onConfirm={({ count }) => onChange({ caveCardCount: count })}
      />
    </Stack>
  );
};

export default ForestSummary;
