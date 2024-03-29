import strings from "../localization/strings";
import { Background, PageElementType } from "../types";

export const EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH = 280;

export const EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT = 497;

export const DEVICE_WIDTH = 1080;

export const DEVICE_HEIGHT = 1920;

export const EDITABLE_TEXT_PAGE_ELEMENTS = [PageElementType.H1, PageElementType.P];

export const QUESTION_PLACEHOLDER_DATA_COMPONENT = "question";

export const START_HOUR = 6;

export const END_HOUR = 21;

export const HOUR_GROUPING = 3;

export const IMAGE_PLACEHOLDER_DATA_COMPONENT = "image";

export const IMAGES = [
  { key: Background.IMAGE_1, value: "/159795711_l.jpg" },
  { key: Background.IMAGE_2, value: "/joulu_tausta_1080x1920.jpg" },
  { key: Background.GREEN, value: "/green_background.png" },
  { key: Background.WHITE, value: "/white_background.png" }
];

export const READY_TO_USE_LAYOUTS = ["question", "info"];

export const CHART_IDS = [
  "answers-per-display-chart",
  "most-popular-days-chart",
  "most-popular-hours-chart"
];

export const CHART_STRINGS = {
  [CHART_IDS[0]]: strings.pdfStatisticsDownload.answersPerDisplayChart,
  [CHART_IDS[1]]: strings.pdfStatisticsDownload.mostPopularDaysChart,
  [CHART_IDS[2]]: strings.pdfStatisticsDownload.mostPopularHoursChart
};
