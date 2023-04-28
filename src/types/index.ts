/**
 * Error context type
 */
export type ErrorContextType = {
  error?: string;
  setError: (message: string, error?: any) => void;
};

/**
 * Enum for surveys screen
 */
export enum SurveyScreens {
  ACTIVE = "active",
  NOT_IMPLEMENTED = "not_implemented",
};

/**
 * Enum for navigation links
 */
export enum NavigationLinks {
  OVERVIEW = "overview",
  SURVEYS = "surveys",
  SCREENS = "screens"
};