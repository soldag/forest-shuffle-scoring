import React, { ReactNode, useState } from "react";
import { FormattedMessage } from "react-intl";

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

const CardCount: React.FC<CardCountProps> = ({
  label,
  value,
  endDecorator,
}) => {
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

const ForestSummary: React.FC<ForestSummaryProps> = ({ forest, onChange }) => {
  const [showCaveModal, setShowCaveModal] = useState(false);

  return (
    <Stack direction="row" alignItems="center" gap={4}>
      <CardCount
        label={
          <FormattedMessage
            id="ForestView.ForestSummary.labels.trees"
            defaultMessage="Trees:"
          />
        }
        value={forest.trees.length}
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
          <Link color="neutral" onClick={() => setShowCaveModal(true)}>
            <EditIcon />
          </Link>
        }
      />

      <CaveModal
        open={showCaveModal}
        count={forest.caveCardCount}
        onClose={() => setShowCaveModal(false)}
        onConfirm={({ count }) => onChange({ caveCardCount: count })}
      />
    </Stack>
  );
};

export default ForestSummary;
