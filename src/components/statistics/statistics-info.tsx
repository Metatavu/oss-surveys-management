import { Survey } from "../../generated/client";
import strings from "../../localization/strings";
import { Box, Typography } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  overallAnswerCount: number;
}

/**
 * Survey Properties component
 *
 * @param props component properties
 */
const StatisticsInfo = ({ survey, overallAnswerCount }: Props) => {
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
        <Typography variant="h6">{strings.surveyStatistics.answerCount}</Typography>
        <Typography variant="h4" fontWeight="bold" color="#00aa46">
          {overallAnswerCount}
        </Typography>
      </Box>
    </>
  );
};

export default StatisticsInfo;
