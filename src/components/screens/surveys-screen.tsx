import { List, ListItem, Tab, Tabs, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DateTime } from "luxon";
import strings from "../../localization/strings";
import { SurveyScreens } from "../../types";

const mockData = [
  {
    id: "12313",
    kysely: "name of survey",
    näytöt: 3,
    julkaisuaika: DateTime.now(),
    päättymisaika: DateTime.now(),
    suosituinNäyttö: "location",
    vastauksia: 234324
  },
  {
    id: "12314",
    kysely: "name of survey2",
    näytöt: 4,
    julkaisuaika: DateTime.now(),
    päättymisaika: DateTime.now(),
    suosituinNäyttö: "location 2",
    vastauksia: 17
  },
];

/**
 * Interface for tab panel props
 */
interface TabPanelProps {
  children: React.ReactNode;
  value: SurveyScreens;
  index: SurveyScreens;
};

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

  /**
   * Tab Panel
   *
   * @param props TabPanelProps
   * @returns Tab panel
   */
  const TabPanel = (props: TabPanelProps) => {
    const {children, value, index} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`Survey-screen-tabpanel-${index}`}
        aria-labelledby={`Survey-screen-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            { children }
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box>
      <Box>
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} >
          <Tab
            value={SurveyScreens.ACTIVE}
            label={`Aktiiviset kyselyt (${mockData.length})`}
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