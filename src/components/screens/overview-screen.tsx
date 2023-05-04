import { errorAtom } from "../../atoms/error";
import { Survey } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { SurveyScreens } from "../../types";
import TabPanel from "../surveys/TabPanel";
import { Box, List, ListItem, ListItemText, Paper, Tab, Tabs } from "@mui/material";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

/**
 *  Renders overview screen
 */
const OverviewScreen = () => {
  const [activeTab, setActiveTab] = useState(SurveyScreens.ACTIVE);
  const { surveysApi } = useApi();
  const setError = useSetAtom(errorAtom);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  /**
   * Get active Surveys
   */
  const getSurveys = async () => {
    try {
      const surveys = await surveysApi.listSurveys({});
      setSurveys(surveys);
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.surveysNotFound}, ${error}`)
    }
  }

  useEffect(() => {
    getSurveys();
  }, []);

  /**
   * Render survey list headings
   */
  const renderSurveyListHeadings = () => (
    <ListItem>
      <ListItemText primary={strings.overviewScreen.surveyTitle} />
      <ListItemText primary={strings.overviewScreen.screens} />
      <ListItemText primary={strings.overviewScreen.publicationDate} />
      <ListItemText primary={strings.overviewScreen.endTime} />
      <ListItemText primary={strings.overviewScreen.mostPopular} />
      <ListItemText primary={strings.overviewScreen.answers} />
    </ListItem>
  );

  /**
   * Renders list of surveys
   */
  const renderSurveysList = () => {
    return (
      <List>
        {renderSurveyListHeadings()}
        {surveys.map(survey => (
          <ListItem key={survey.id}>
            <ListItemText secondary={survey.title} />
            <ListItemText secondary={strings.generic.notImplemented} />
            <ListItemText secondary={strings.generic.notImplemented} />
            <ListItemText secondary={strings.generic.notImplemented} />
            <ListItemText secondary={strings.generic.notImplemented} />
            <ListItemText secondary={strings.generic.notImplemented} />
          </ListItem>
        ))}
      </List>
    )
  };

  return (
    <Box p={4}>
      <Paper>
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} >
          <Tab
            value={SurveyScreens.ACTIVE}
            label={strings.formatString(strings.overviewScreen.activeSurveys, `(${surveys.length})`)}
          />
          <Tab
            value={SurveyScreens.NOT_IMPLEMENTED}
            label={strings.generic.notImplemented}
          />
        </Tabs>
        <TabPanel value={activeTab} index={SurveyScreens.ACTIVE} >
          {renderSurveysList()}
        </TabPanel>
        <TabPanel value={activeTab} index={SurveyScreens.NOT_IMPLEMENTED} >
          {strings.generic.notImplemented}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default OverviewScreen;