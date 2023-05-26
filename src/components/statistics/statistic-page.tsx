import { Device, DeviceSurvey, DeviceSurveyQuestionStatistics, DeviceSurveyStatistics } from "../../generated/client";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import AnswersDistributionChart from "./answer-distribution-chart";
import DeviceDistributionChart from "./device-distribution-chart";
import HorizontalChart from "./horizontal-chart";
import { Divider, Paper, Stack, Typography } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  devices: Device[];
  deviceSurveys: DeviceSurvey[];
  surveyStatistics: DeviceSurveyStatistics[];
  question: DeviceSurveyQuestionStatistics;
  overallAnswerCount: number;
  pageTitle: string;
}

/**
 * Statistic page component
 */
const StatisticPage = ({ devices, question, pageTitle, surveyStatistics, overallAnswerCount }: Props) => {

  /**
   * get daily average answer count
   */
  const getDailyAverageAnswerCount = () => {
    const dailyChartdata = [
      { label: 'Ma', value: surveyStatistics[0].averages.weekDays[0] },
      { label: 'Ti', value: surveyStatistics[0].averages.weekDays[1] },
      { label: 'Ke', value: surveyStatistics[0].averages.weekDays[2] },
      { label: 'To', value: surveyStatistics[0].averages.weekDays[3] },
      { label: 'Su', value: surveyStatistics[0].averages.weekDays[4] },
      { label: 'La', value: surveyStatistics[0].averages.weekDays[5] },
      { label: 'Su', value: surveyStatistics[0].averages.weekDays[6] }
    ];
    return dailyChartdata;
  };

  /**
   * Get hourly average answer count
   */
  const getHourlyAverageAnswerCount = () => {
    const hourlyChartData = [
      { label: '6-9', value: surveyStatistics[0].averages.hourly.slice(5, 8).reduce((acc, value) => acc + value, 0) },
      { label: '9-12', value: surveyStatistics[0].averages.hourly.slice(8, 11).reduce((acc, value) => acc + value, 0) },
      { label: '12-15', value: surveyStatistics[0].averages.hourly.slice(11, 14).reduce((acc, value) => acc + value, 0) },
      { label: '15-18', value: surveyStatistics[0].averages.hourly.slice(14, 17).reduce((acc, value) => acc + value, 0) },
      { label: '18-21', value: surveyStatistics[0].averages.hourly.slice(17, 20).reduce((acc, value) => acc + value, 0) }
    ];
    return hourlyChartData;
  };


  return (
    <Stack flex={1} p={theme.spacing(4)}>
      <Paper>
        <Typography variant="h6" padding={2}>
          {`K: "${pageTitle}"`}
        </Typography>
        <Divider />
        <Stack padding={2}>
          <Typography variant="h6">
            {strings.surveyStatistics.answersDistribution}
          </Typography>
          <AnswersDistributionChart data={question.options} />
        </Stack>
        <Divider />
        <Stack direction="row" padding={2}>
          <Stack marginRight={6}>
            <Typography variant="h6">
              {strings.surveyStatistics.answers}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="#00aa46">
              {overallAnswerCount}
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack padding={2}>
            <Typography variant="h6">
              {strings.surveyStatistics.mostPopularDays}
            </Typography>
            <HorizontalChart data={getHourlyAverageAnswerCount()} />
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack padding={2}>
            <Typography variant="h6">
              {strings.surveyStatistics.mostPopularHours}
            </Typography>
            <HorizontalChart data={getDailyAverageAnswerCount()} />
          </Stack>
        </Stack>
        <Divider />
        <Stack padding={2}>
          <Typography variant="h6">{strings.surveyStatistics.answersPerDisplay}</Typography>
          <DeviceDistributionChart data={surveyStatistics} devices={devices} />
        </Stack>
      </Paper >
    </Stack >
  );
};

export default StatisticPage;