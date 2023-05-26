import { DeviceSurveyQuestionStatistics } from "../../generated/client";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import AnswersDistributionChart from "./answer-distribution-chart";
import { Divider, Paper, Stack, Typography } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  question: DeviceSurveyQuestionStatistics;
  pageTitle: string;
}

/**
 * Statistic page component
 */
const StatisticPage = ({ question, pageTitle }: Props) => {
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
      </Paper >
    </Stack >
  );
};

export default StatisticPage;