import { Stack } from "@mui/joy";

import Header from "@/components/common/Header";
import View from "@/components/common/View";

import ErrorCard from "./components/ErrorCard";

const ErrorView = () => (
  <View header={<Header />}>
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
