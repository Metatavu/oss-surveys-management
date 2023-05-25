import { NavigationLinks } from "../types";

/**
 * Gets translated navigation
 *
 * @param navigation navigation
 */
export const getTranslatedNavigation = (navigation: NavigationLinks): string =>
  ({
    [NavigationLinks.OVERVIEW]: "/overview",
    [NavigationLinks.SURVEYS]: "/surveys",
    [NavigationLinks.SCREENS]: "/screens",
    [NavigationLinks.PREVIEW]: "/preview"
  })[navigation];

/**
 * Matches navigation
 *
 * @param path path
 */
export const matchNavigation = (path: string): NavigationLinks =>
  Object.values(NavigationLinks).find(
    (navigation) => !!path.startsWith(getTranslatedNavigation(navigation))
  ) || NavigationLinks.OVERVIEW;
