import { authAtom, userProfileAtom } from "../../atoms/auth";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import logo from "../../assets/oss.svg";
import NavButton from "./nav-button";
import strings from "../../localization/strings";
import { useLocation } from "react-router-dom";
import { matchNavigation } from "../../utils/NavigationUtils";
import { NavigationLinks } from "../../types";

/**
 * Header component
 *
 * @param props component properties
 */
const Header: React.FC = () => {
  const [auth] = useAtom(authAtom);
  const profileAtom = useAtomValue(userProfileAtom);
  const { pathname } = useLocation();
  const currentNavigation = matchNavigation(pathname);

  const renderLogOutButton = () => {
    return (
      <IconButton onClick={() => auth?.logout()}>
        <ExitToAppOutlinedIcon />
      </IconButton>
    )
  }

  /**
   * Renders user profile
   */
  const renderUser = () => {
    return (
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar />
        <Stack>
          <Typography variant="subtitle1">
            {`${profileAtom?.firstName} ${profileAtom?.lastName}`}
          </Typography>
          <Typography variant="subtitle2">
            {profileAtom?.email}
          </Typography>
        </Stack>
        {renderLogOutButton()}
      </Stack>
    )
  }

  /**
   * Renders navigation buttons
   */
  const renderNavigation = () => {
    return (
      <Stack direction="row" gap={2} alignItems="center">
        <NavButton
          selected={currentNavigation === NavigationLinks.OVERVIEW}
          title={strings.navigation.overview}
          to={NavigationLinks.OVERVIEW}
        />
        <NavButton
          selected={currentNavigation === NavigationLinks.SURVEYS}
          title={strings.navigation.surveys}
          to={NavigationLinks.SURVEYS}
        />
        <NavButton
          selected={currentNavigation === NavigationLinks.SCREENS}
          title={strings.navigation.screens}
          to={NavigationLinks.SCREENS}
        />
      </Stack>
    )
  }

  return (
    <AppBar position="sticky">
      <Stack gap={4} direction="row">
        <img height={30} src={logo}></img>
        {renderNavigation()}
      </Stack>
      <Toolbar>
        {renderUser()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;