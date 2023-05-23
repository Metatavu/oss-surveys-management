import { Box } from "@mui/material";
import { OverviewScreenTabs } from "../../types";

/**
 * Interface for tab panel props
 */
interface Props {
  children: React.ReactNode;
  value: OverviewScreenTabs;
  index: OverviewScreenTabs;
}

/**
 * Tab Panel
 *
 * @param props TabPanelProps
 * @returns Tab panel
 */
const TabPanel = ({ children, value, index }: Props) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
