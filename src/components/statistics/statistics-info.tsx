import { DeviceSurveyStatistics, Survey } from "../../generated/client";
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
}

/**
 * Survey Properties component
 */
const StatisticsInfo = ({ survey, surveyStatistics }: Props) => {

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
        {surveyStatistics[0]?.totalAnswerCount ?? 0}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.mostAttainableTime}
        </Typography>
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.mostPopularAnswer}
        </Typography>
        {"Nakki ja piirakkka"}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.surveyStatistics.mostEfficientScreen}
        </Typography>
        {"Mikähän se olisi"}
      </Box>
    </>
  );
};

export default StatisticsInfo;
