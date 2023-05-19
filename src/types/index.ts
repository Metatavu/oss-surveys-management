import strings from "../localization/strings";

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
 * Enum for background colors and image paths
 * TODO: add actual image paths once they are available
 */
export enum Background {
  DEFAULT = "#00aa46",
  IMAGE_1 = "image 1",
  IMAGE_2 = "image 2",
  IMAGE_3 = "image 3",
  IMAGE_4 = "image 4",
  IMAGE_5 = "image 5"
}

/**
 * Gets translated background
 *
 * @param background navigation
 */
export const getTranslatedBackground = (background: Background): string =>
  ({
    [Background.DEFAULT]: strings.editSurveysScreen.editPagesPanel.backgroundImages.default,
    [Background.IMAGE_1]: strings.editSurveysScreen.editPagesPanel.backgroundImages.image1,
    [Background.IMAGE_2]: strings.editSurveysScreen.editPagesPanel.backgroundImages.image2,
    [Background.IMAGE_3]: strings.editSurveysScreen.editPagesPanel.backgroundImages.image3,
    [Background.IMAGE_4]: strings.editSurveysScreen.editPagesPanel.backgroundImages.image4,
    [Background.IMAGE_5]: strings.editSurveysScreen.editPagesPanel.backgroundImages.image5
  })[background];

/**
 * Type describing available languages
 */
export type Language = "fi" | "en";
