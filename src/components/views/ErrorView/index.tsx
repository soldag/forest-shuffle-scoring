import { Stack } from "@mui/joy";

import HeaderTitle from "@/components/common/HeaderTitle";
import View from "@/components/common/View";

import ErrorCard from "./components/ErrorCard";

const ErrorView = () => (
  <View header={<HeaderTitle />}>
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100%" }}
    >
      <ErrorCard />
    </Stack>
  </View>
);

export default ErrorView;
