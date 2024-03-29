import { DeviceSurveyStatistics } from "../generated/client";

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
    pageId: string;
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
  PAGE = "PAGE",
  PUBLISH = "PUBLISH"
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
  GREEN = "green",
  WHITE = "white",
  IMAGE_1 = "image 1",
  IMAGE_2 = "image 2"
}

/**
 * Type describing available languages
 */
export type Language = "fi" | "en";

/**
 * Type describing editable page elements
 */
export type EditablePageElement = {
  type: PageElementType;
  element: Element;
  id: string;
};

/**
 * Enum describing editable page element types
 *
 * Note: Currently these are the tag names of the elements that can contain layout variables and there will probably be more eventually.
 */
export enum PageElementType {
  H1 = "h1",
  P = "p",
  DIV = "div",
  IMG = "img",
  HEADER_CONTAINER = "header-container",
  TEXT_CONTAINER = "text-container"
}

/**
 * Enum for Survey Management status
 */
export enum SurveyManagementStatus {
  PUBLISHED = "published",
  APPROVED = "approved",
  SCHEDULED = "scheduled",
  DRAFT = "draft"
}

/** Enum for survey screen mode */
export enum SurveyScreenMode {
  EDITOR,
  PUBLISH,
  STATISTICS
}

/**
 * Type for Survey Statistics grouped by Survey
 */
export type StatisticsGroupedBySurvey = {
  [key: string]: DeviceSurveyStatistics[];
};

/**
 * Interface for SurveyQuestionStatistics
 */
export interface SurveyQuestionStatistics {
  pageId: string;
  options: SurveyQuestionOptionStatistics[];
}

/**
 * Interface for SurveyQuestionOptionStatistics
 */
export interface SurveyQuestionOptionStatistics {
  answerCount: number;
  questionOptionValue: string;
}

/**
 * Interface for ChartData
 */
export interface ChartData {
  id: string;
  ref: string;
}

/**
 * Interface for CombinedChartData
 */
export interface CombinedChartData {
  popularTimesAndDeviceCharts: ChartData[];
  answerDistributionCharts: ChartData[];
}

/**
 * Intrface for PopularTimeChartsData
 */
export interface PopularTimeChartsData {
  label: string;
  value: number;
}
