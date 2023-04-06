import { Button, styled } from "@mui/material";
import React from "react";

/**
 * Component props
 */
interface Props {
  title: string;
  selected: boolean;
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
const NavButton: React.FC<Props> = ({ title, selected }) => {
  return (
    <NavigationButton className={selected ? "selected" : ""}>
      {title}
    </NavigationButton>
  )
}

export default NavButton;