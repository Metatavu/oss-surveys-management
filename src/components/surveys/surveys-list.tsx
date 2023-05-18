import { Box, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { DeviceSurvey, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import ListHeader from "../generic/list-header";
import { useNavigate } from "react-router-dom";
import SurveyUtils from "../../utils/survey-utils";
import LocalizationUtils from "../../utils/localization-utils";
import { SurveyManagementStatus } from "../../types";
import { DateTime } from "luxon";

/**
 * Components properties
 */
interface Props {
  surveys: Survey[];
  deviceSurveys: DeviceSurvey[];
}

/**
 * Surveys List component
 */
const SurveysList = ({ surveys, deviceSurveys }: Props) => {
  const navigate = useNavigate();

  const listHeadings = Object.values(strings.surveysScreen.headings);

  /**
   * Gets Surveys last modified date string
   *
   * @param survey survey
   */
  const getSurveysLastModifiedDate = (survey: Survey) =>
    DateTime.fromJSDate(survey.metadata!.modifiedAt!).toFormat("dd.MM.yyyy");

  return (
    <Box p={4}>
      <Paper>
        <List>
          <ListHeader headings={listHeadings} />
          {surveys.map((survey) => {
            const surveyManagementStatus = SurveyUtils.getSurveyManagementStatus(
              survey,
              deviceSurveys
            );

            return (
              <ListItemButton
                key={survey.id}
                onClick={() => navigate(`/surveys/edit/${survey.id}`)}
              >
                <ListItemText
                  secondaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "primary"
                  }}
                  secondary={survey.title}
                />
                <ListItemText
                  secondaryTypographyProps={{
                    color:
                      surveyManagementStatus === SurveyManagementStatus.PUBLISHED ? "primary" : ""
                  }}
                  secondary={LocalizationUtils.getLocalizedSurveyManagementStatus(
                    surveyManagementStatus
                  )}
                />
                <ListItemText
                  secondary={SurveyUtils.getEarliestSurveyPublicationDate(deviceSurveys, survey.id)}
                />
                <ListItemText secondary={strings.generic.notImplemented} />
                <ListItemText secondary={strings.generic.notImplemented} />
                <ListItemText secondary={getSurveysLastModifiedDate(survey)} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default SurveysList;
