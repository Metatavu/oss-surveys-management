import { Button, styled } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

/**
 * Component props
 */
interface Props {
  title: string;
  selected: boolean;
  to: string;
}

/**
 * Styled navigation button
 */
const NavigationButton = styled(Button, {
  label: "navigation-button"
})(({ theme }) => ({
  color: theme.palette.primary.dark,
  paddingLeft: 0,
  paddingRight: 0,
  borderBottomWidth: 2,
  borderStyle: "solid",
  borderBottomColor: "#fff",
  borderRadius: 0,
  "&.selected": {
    color: theme.palette.primary.main,
    borderBottomColor: theme.palette.primary.main
  }
}));

/**
 * NavButton component
 *
 * @param props component properties
 */
const NavButton: FC<Props> = ({ title, selected, to }) => {
  return (
    <Link to={to}>
      <NavigationButton className={selected ? "selected" : ""}>
        {title}
      </NavigationButton>
    </Link>
  )
}

export default NavButton;