/**
 * Error context type
 */
export type ErrorContextType = {
  error?: string;
  setError: (message: string, error?: any) => void;
};

// TODO: Question types below should be removed when available from generated files
/**
 * Interface for Question
 */
export interface Question {
  id: string;
  type: QuestionType;
  options: QuestionOption[];
}

/**
 * Interface for Panel properties
 */
export interface PanelProperties {
  panelType: EditorPanel;
  pageNumber?: number;
}

/**
 * Question option type
 */
export type QuestionOption = {
  id: string;
  text: string;
};

/**
 * Enum for question type
 */
export enum QuestionType {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE"
}

/**
 * Interface to describe iframe click event
 */
export interface IframeClickEvent extends Event {
  detail: {
    eventType: "iframeclick";
    pageNumber: number;
  };
}

/**
 * Enum for Overview Screen tabs
 */
export enum OverviewScreenTabs {
  ACTIVE = "active",
  IDLE_DEVICES = "idle_devices",
  OFFLINE_DEVICES = "offline_devices",
  NEW_DEVICES = "new_devices"
}

/**
 * Enum for navigation links
 */
export enum NavigationLinks {
  OVERVIEW = "overview",
  SURVEYS = "surveys",
  SCREENS = "screens",
  PREVIEW = "preview"
}

/**
 * Enum for editor panel properties
 */
export enum EditorPanel {
  SURVEY = "SURVEY",
  PAGE = "PAGE"
}

/**
 * Enum for template types
 */
export enum LayoutType {
  QUESTION = "question",
  INFO = "info",
  IMAGE = "image",
  QUESTION_INFO = "question + info",
  IMAGE_INFO = "image + info",
  INFO_IMAGE = "info + image",
  STATISTICS = "statistics"
}

/**
 * Type describing available languages
 */
export type Language = "fi" | "en";

/**
 * Enum for Survey Management status
 */
export enum SurveyManagementStatus {
  PUBLISHED = "published",
  APPROVED = "approved",
  SCHEDULED = "scheduled",
  DRAFT = "draft"
}
