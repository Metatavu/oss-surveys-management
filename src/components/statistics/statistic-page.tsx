import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Device, DeviceSurvey } from "../../generated/client";
import theme from "../../styles/theme";
import GenericChart from "./generic-chart";
import strings from "../../localization/strings";

/**
 * Components properties
 */
interface Props {
  devices: Device[];
  deviceSurveys: DeviceSurvey[];
}

/**
 * Statistic page component
 */
const StatisticPage = ({ devices, deviceSurveys }: Props) => {
  return (
    <Stack flex={1} p={theme.spacing(4)}>
      <Paper>
        <Stack>
          <GenericChart />
        </Stack>
        <Divider />
        <Stack direction="row" margin={3}>
          <Stack marginRight={6}>
            <Typography variant="h6">
              {"Vastauksia"}
            </Typography>
            {1234}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <GenericChart />
          <GenericChart />
        </Stack>
        <Divider />
        <Stack>
          <GenericChart />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default StatisticPage;