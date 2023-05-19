import { ListItem, ListItemText } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  headings: string[];
}

/**
 * List Header component
 */
const ListHeader = ({ headings }: Props) => {
  return (
    <ListItem>
      {headings.map((heading) => (
        <ListItemText key={heading} primary={heading} />
      ))}
    </ListItem>
  );
};

export default ListHeader;
