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
  { key: Background.IMAGE_1, value: "/AO_suursavo_matkasivarrella_1080x1920.jpg" }
];

export const PAGE_IMAGES = [{ key: Background.DEFAULT, value: "DEFAULT" }].concat(IMAGES);

export const PAGE_BACKGROUNDS = [{ key: Background.DEFAULT, value: "DEFAULT" }].concat(IMAGES);
