import { ListItem, ListItemText } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  headings: string[];
}

/**
 * Overview screens List Header component
 */
const OverviewListHeader = ({ headings }: Props) => {
  return (
    <ListItem>
      {headings.map((heading) => (
        <ListItemText key={heading} primary={heading} />
      ))}
    </ListItem>
  );
};

export default OverviewListHeader;
