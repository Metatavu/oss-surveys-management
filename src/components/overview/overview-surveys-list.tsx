import { ListItemText, List, ListItemButton } from "@mui/material";
import { DeviceSurvey, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import SurveyUtils from "../../utils/survey-utils";
import { useNavigate } from "react-router-dom";
import OverviewListHeader from "./overview-list-header";

/**
 * Components properties
 */
interface Props {
  surveys: Survey[];
  deviceSurveys: DeviceSurvey[];
}

/**
 * Overview screens Survey List component
 */
const OverviewSurveyList = ({ surveys, deviceSurveys }: Props) => {
  const navigate = useNavigate();
  const listHeadings = Object.values(strings.overviewScreen.activeSurveys);

  return (
    <List>
      <OverviewListHeader headings={listHeadings} />
      {surveys.map((survey) => (
        <ListItemButton key={survey.id} onClick={() => navigate(`/surveys/edit/${survey.id}`)}>
          <ListItemText secondary={survey.title} />
          <ListItemText secondary={SurveyUtils.getSurveyDeviceCount(deviceSurveys, survey.id)} />
          <ListItemText
            secondary={SurveyUtils.getEarliestSurveyPublicationDate(deviceSurveys, survey.id)}
          />
          <ListItemText
            secondary={SurveyUtils.getLatestSurveyPublicationEndDate(deviceSurveys, survey.id)}
          />
          <ListItemText secondary={strings.generic.notImplemented} />
          <ListItemText secondary={strings.generic.notImplemented} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default OverviewSurveyList;
