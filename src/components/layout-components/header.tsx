import logo from "../../assets/oss.svg";
import { authAtom, userProfileAtom } from "../../atoms/auth";
import { languageAtom } from "../../atoms/language";
import strings from "../../localization/strings";
import { Language, NavigationLinks } from "../../types";
import { matchNavigation } from "../../utils/navigation-utils";
import NavButton, { NavigationButton } from "./nav-button";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { useLocation } from "react-router-dom";

/**
 * Header component
 *
 * @param props component properties
 */
const Header = () => {
  const [auth] = useAtom(authAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const profile = useAtomValue(userProfileAtom);
  const { pathname } = useLocation();
  const currentNavigation = matchNavigation(pathname);

  /**
   * Handles localization change
   */
  const handleLocaleChange = (locale: string) => {
    setLanguage(locale as Language);
  };

  /**
   * Renders logout button
   */
  const renderLogOutButton = () => (
    <IconButton onClick={auth?.logout}>
      <ExitToAppOutlinedIcon />
    </IconButton>
  );

  /**
   * Renders user profile
   */
  const renderUser = () => (
    <Stack direction="row" gap={2} alignItems="center">
      <Avatar />
      <Stack>
        <Typography variant="subtitle1">{`${profile?.firstName} ${profile?.lastName}`}</Typography>
        <Typography variant="subtitle2">{profile?.email}</Typography>
      </Stack>
      {renderLogOutButton()}
    </Stack>
  );

  /**
   * Renders navigation buttons
   *
   * @returns Navigation
   */
  const renderNavigation = () => (
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
      {/* TODO: This screen is not implemented and therefore the navigation button is removed. */}
      {/* <NavButton
        selected={currentNavigation === NavigationLinks.SCREENS}
        title={strings.navigation.screens}
        to={NavigationLinks.SCREENS}
      /> */}
    </Stack>
  );

  /**
   * Renders localization buttons
   */
  const renderLocalizationButtons = () => (
    <Stack direction="row" alignItems="center">
      {strings.getAvailableLanguages().map((lang) => (
        <NavigationButton
          key={lang}
          className={lang === language ? "selected" : ""}
          onClick={() => handleLocaleChange(lang)}
        >
          {strings.getString(`localization.${lang}`, language)}
        </NavigationButton>
      ))}
    </Stack>
  );

  return (
    <AppBar position="sticky">
      <Stack gap={4} direction="row">
        <img height={30} src={logo} alt={strings.navigation.logo} />
        {renderNavigation()}
      </Stack>
      <Toolbar>
        <Stack direction="row" gap={2}>
          {renderLocalizationButtons()}
          {renderUser()}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
