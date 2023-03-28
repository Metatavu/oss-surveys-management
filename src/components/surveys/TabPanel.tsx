import { Box } from "@mui/material";
import { SurveyScreens } from "../../types";

/**
 * Interface for tab panel props
 */
interface Props {
  children: React.ReactNode;
  value: SurveyScreens;
  index: SurveyScreens;
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

export default TabPanel;