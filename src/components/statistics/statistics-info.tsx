import { DeviceSurveyStatistics, Page, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import {
  Box,
  Typography
} from "@mui/material";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  surveyStatistics: DeviceSurveyStatistics[];
  mostPopularDisplay: string;
  overallAnswerCount: number;
  surveyPages: Page[];
}

/**
 * Survey Properties component
 */
const StatisticsInfo = ({ survey, surveyStatistics, mostPopularDisplay, overallAnswerCount, surveyPages }: Props) => {
  /**
   * Get most popular answer
   */
  const getMostPopularAnswer = () => {
    const mostPopularAnswer = surveyStatistics[0]?.questions[0]?.options.sort((a, b) => {
      return b.answerCount - a.answerCount;
    })[0];

    return (
      <>
        <Typography>
          {`"${surveyPages[1]?.properties[0]?.value ?? ""}"`}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="#00aa46">
          {mostPopularAnswer?.questionOptionValue}
        </Typography>
      </>
    );
  };

  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{strings.editSurveysScreen.statistics}</Typography>
        {survey.title}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.editSurveysScreen.editSurveyPanel.description}
        </Typography>
        {survey.description}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.answerCount}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="#00aa46">
          {overallAnswerCount}
        </Typography>
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.mostAttainableTime}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="#00aa46">
          "12:00 - 13:00"
        </Typography>
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.mostPopularAnswer}
        </Typography>
        {getMostPopularAnswer()}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.mostEfficientScreen}
        </Typography>
        {mostPopularDisplay}
      </Box>
    </>
  );
};

export default StatisticsInfo;
