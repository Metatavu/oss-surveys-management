/**
 * Error context type
 */
export type ErrorContextType = {
  error?: string;
  setError: (message: string, error?: any) => void;
};

/**
 * Question type
 */
export type Question = {
  id: string;
  type: QuestionType;
  data: string;
};

/**
 * Enum for question type
 */
export enum QuestionType {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE"
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