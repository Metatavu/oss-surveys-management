import { Device, DeviceSurveyStatistics } from "../../generated/client";
import strings from "../../localization/strings";
import DeviceDistributionChart from "./device-distribution-chart";
import HorizontalChart from "./horizontal-chart";
import PdfDeviceDistributionChart from "./pdf-device-distribution-chart";
import PdfHorizontalChart from "./pdf-horizontal-chart";
import { Divider, Paper, Stack, Typography } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  devices: Device[];
  surveyStatistics: DeviceSurveyStatistics[];
  overallAnswerCount: number;
  hourlyChartData: any;
  dailyChartData: any;
}

/**
 * Statistic page component
 *
 * @param props component properties
 */
const OverallStatisticsCharts = ({
  devices,
  surveyStatistics,
  overallAnswerCount,
  hourlyChartData,
  dailyChartData
}: Props) => {
  return (
    <Paper>
      <Stack direction="row">
        <Stack p={2}>
          <Typography variant="h6">{strings.surveyStatistics.answers}</Typography>
          <Typography variant="h4" fontWeight="bold" color="#00aa46">
            {overallAnswerCount}
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack p={2} flex={1}>
          <Typography variant="h6">{strings.surveyStatistics.mostPopularDays}</Typography>
          <HorizontalChart usesPercentage data={dailyChartData} />
          <PdfHorizontalChart id="most-popular-days-chart" usesPercentage data={dailyChartData} />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack p={2} flex={1}>
          <Typography variant="h6">{strings.surveyStatistics.mostPopularHours}</Typography>
          <HorizontalChart usesPercentage data={hourlyChartData} />
          <PdfHorizontalChart id="most-popular-hours-chart" usesPercentage data={hourlyChartData} />
        </Stack>
      </Stack>
      <Divider />
      <Stack p={2}>
        <Typography variant="h6">{strings.surveyStatistics.answersPerDisplay}</Typography>
        <DeviceDistributionChart data={surveyStatistics} devices={devices} />
        <PdfDeviceDistributionChart data={surveyStatistics} devices={devices} />
      </Stack>
    </Paper>
  );
};

export default OverallStatisticsCharts;
