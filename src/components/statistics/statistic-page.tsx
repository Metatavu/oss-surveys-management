import strings from "../../localization/strings";
import { SurveyQuestionStatistics } from "../../types";
import PageUtils from "../../utils/page-utils";
import AnswersDistributionChart from "./answer-distribution-chart";
import { Divider, Paper, Stack, Typography } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  question: SurveyQuestionStatistics;
  pageTitle: string;
}

/**
 * Statistic page component
 *
 * @param props component properties
 */
const StatisticPage = ({ question, pageTitle }: Props) => {
  return (
    <Paper>
      <Typography variant="h6" padding={2}>
        {`K: "${PageUtils.getSerializedHTMLInnerPropertyValues(pageTitle)}"`}
      </Typography>
      <Divider />
      <Stack padding={2}>
        <Typography variant="h6">{strings.surveyStatistics.answersDistribution}</Typography>
        <AnswersDistributionChart data={question.options} />
      </Stack>
    </Paper>
  );
};

export default StatisticPage;
