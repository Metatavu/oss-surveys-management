/**
 * Error context type
 */
export type ErrorContextType = {
  error?: string;
  setError: (message: string, error?: any) => void;
};

/**
 * Interface to describe iframe click event
 */
export interface IframeClickEvent extends Event {
  detail: {
    eventType: "iframeclick";
    pageNumber: number;
  }
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
  SCREENS = "screens",
  PREVIEW = "preview"
};

/**
 * Enum for editor panel properties
 */
export enum EditorPanelProperties {
  SURVEY = "SURVEY",
  PAGE = "PAGE"
};