import { List, ListItem, Tab, Tabs, ListItemText, Box } from "@mui/material";
import { useState } from "react";
import strings from "../../localization/strings";
import { SurveyScreens } from "../../types";
import { mockData } from "./surveys-mock-data";
import TabPanel from "../surveys/TabPanel";

const SurveysScreen = () => {
  const [ activeTab, setActiveTab ] = useState(SurveyScreens.ACTIVE);

  // TODO: Fetch surveys data from backend when available

  /**
   * Render survey list headings
   */
  const renderSurveyListHeadings = () => (
    <ListItem>
      <ListItemText>
        { strings.surveysScreen.surveyTitle }
      </ListItemText>
      <ListItemText>
      { strings.surveysScreen.screens }
      </ListItemText>
      <ListItemText>
      { strings.surveysScreen.publicationDate }
      </ListItemText>
      <ListItemText>
      { strings.surveysScreen.endTime }
      </ListItemText>
      <ListItemText>
      { strings.surveysScreen.mostPopular }
      </ListItemText>
      <ListItemText>
      { strings.surveysScreen.answers }
      </ListItemText>
    </ListItem>
  );

  /**
   * Renders list of surveys
   */
  const renderSurveysList = () => {
    return (
      <Box>
        <List>
          { renderSurveyListHeadings() }
          {mockData.map(survey => (
            <ListItem key={survey.id}>
              <ListItemText>
                {survey.kysely}
              </ListItemText>
              <ListItemText>
                {survey.näytöt}
              </ListItemText>
              <ListItemText>
                {survey.julkaisuaika.toFormat("dd.MM.yyyy")}
              </ListItemText>
              <ListItemText>
                {survey.päättymisaika.toFormat("dd.MM.yyyy")}
              </ListItemText>
              <ListItemText>
                {survey.suosituinNäyttö}
              </ListItemText>
              <ListItemText>
                {survey.vastauksia}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  };

  return (
    <Box>
      <Box>
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} >
          <Tab
            value={SurveyScreens.ACTIVE}
            label={ strings.formatString(strings.surveysScreen.activeSurveys, `(${mockData.length})`)}
          />
          <Tab
            value={ SurveyScreens.NOT_IMPLEMENTED }
            label={ strings.generic.notImplemented }
          />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={SurveyScreens.ACTIVE} >
        { renderSurveysList() }
      </TabPanel>
      <TabPanel value={activeTab} index={SurveyScreens.NOT_IMPLEMENTED} >
        { strings.generic.notImplemented }
      </TabPanel>
    </Box>
  );
};

export default SurveysScreen;