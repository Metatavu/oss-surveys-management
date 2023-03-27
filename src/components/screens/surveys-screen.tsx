import { List, ListItem, Tab, Tabs, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DateTime } from "luxon";
import strings from "../../localization/strings";

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

interface TabPanelProps {
  value: number;
  index: number;
}

const SurveysScreen = () => {
  const [ activeTab, setActiveTab ] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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

  const TabPanel = (props: TabPanelProps) => {
    const {value, index } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`Survey-screen-tabpanel-${index}`}
        aria-labelledby={`Survey-screen-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            { renderSurveysList() }
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box>
      <Box>
        <Tabs value={activeTab} onChange={handleTabChange} >
          <Tab label={`Aktiiviset kyselyt (${mockData.length})`} />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0} />
    </Box>
  );
};

export default SurveysScreen;