import { List, ListItem, Tab, Tabs, ListItemText, Box, Paper } from "@mui/material";
import { useState } from "react";
import strings from "../../localization/strings";
import { SurveyScreens } from "../../types";
import { mockData } from "./surveys-mock-data";
import TabPanel from "../surveys/TabPanel";

/**
 *  Renders overview screen
 */
const OverviewScreen = () => {
  const [ activeTab, setActiveTab ] = useState(SurveyScreens.ACTIVE);

  // TODO: Fetch surveys data from backend when available

  /**
   * Render survey list headings
   */
  const renderSurveyListHeadings = () => (
    <ListItem>
      <ListItemText primary={ strings.surveysScreen.surveyTitle }/>
      <ListItemText primary={ strings.surveysScreen.screens } />
      <ListItemText primary={ strings.surveysScreen.publicationDate } />
      <ListItemText primary={ strings.surveysScreen.endTime }/>
      <ListItemText primary={ strings.surveysScreen.mostPopular } />
      <ListItemText primary={ strings.surveysScreen.answers } />
    </ListItem>
  );

  /**
   * Renders list of surveys
   */
  const renderSurveysList = () => {
    return (
      <List>
        { renderSurveyListHeadings() }
        {mockData.map(survey => (
          <ListItem key={survey.id}>
            <ListItemText secondary={survey.title} />
            <ListItemText secondary={survey.screens} />
            <ListItemText secondary={survey.startTime.toFormat("dd.MM.yyyy")} />
            <ListItemText secondary={survey.endTime.toFormat("dd.MM.yyyy")} />
            <ListItemText secondary={survey.topScreen} />
            <ListItemText secondary={survey.answers} />
          </ListItem>
        ))}
      </List>
    )
  };

  return (
    <Box p={4}>
      <Paper>
        <Tabs value={ activeTab } onChange={ (_, value) => setActiveTab(value) } >
          <Tab
            value={ SurveyScreens.ACTIVE }
            label={ strings.formatString(strings.surveysScreen.activeSurveys, `(${mockData.length})`)}
          />
          <Tab
            value={ SurveyScreens.NOT_IMPLEMENTED }
            label={ strings.generic.notImplemented }
          />
        </Tabs>
        <TabPanel value={ activeTab } index={ SurveyScreens.ACTIVE } >
          { renderSurveysList() }
        </TabPanel>
        <TabPanel value={ activeTab } index={ SurveyScreens.NOT_IMPLEMENTED } >
          { strings.generic.notImplemented }
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default OverviewScreen;