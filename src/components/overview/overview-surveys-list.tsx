import { Device, DeviceSurvey, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import { StatisticsGroupedBySurvey } from "../../types";
import SurveyUtils from "../../utils/survey-utils";
import ListHeader from "../generic/list-header";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Components properties
 */
interface Props {
  surveys: Survey[];
  deviceSurveys: DeviceSurvey[];
  groupedStatistics: StatisticsGroupedBySurvey;
  devices: Device[];
}

/**
 * Overview screens Survey List component
 */
const OverviewSurveyList = ({ surveys, deviceSurveys, groupedStatistics, devices }: Props) => {
  const navigate = useNavigate();
  const listHeadings = Object.values(strings.overviewScreen.activeSurveys);
  return (
    <List>
      <ListHeader headings={listHeadings} />
      {surveys.map((survey) => {
        if (!survey.id) return;
        return (
          <ListItemButton key={survey.id} onClick={() => navigate(`/surveys/edit/${survey.id}`)}>
            <ListItemText secondary={survey.title} />
            <ListItemText secondary={SurveyUtils.getSurveyDeviceCount(deviceSurveys, survey.id)} />
            <ListItemText
              secondary={SurveyUtils.getEarliestSurveyPublicationDate(deviceSurveys, survey.id)}
            />
            <ListItemText
              secondary={SurveyUtils.getLatestSurveyPublicationEndDate(deviceSurveys, survey.id)}
            />
            <ListItemText
              secondary={
                SurveyUtils.getDeviceWithHighestAmountOfAnswers(
                  devices,
                  groupedStatistics[survey.id]
                )?.name
              }
            />
            <ListItemText
              secondary={SurveyUtils.getSurveyTotalAnswerCount(survey.id, groupedStatistics)}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default OverviewSurveyList;
