import strings from "../localization/strings";
import { v4 as uuid } from "uuid";

export const EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH = 280;

export const EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT = 497;

export const DEVICE_WIDTH = 2160;

export const DEVICE_HEIGHT = 3840;

export const DEFAULT_QUESTION_OPTION = (orderNumber: number) => ({
  id: uuid(),
  orderNumber: orderNumber,
  questionOptionValue: strings
    .formatString(strings.editSurveysScreen.editPagesPanel.answerOptionPlaceholder, orderNumber)
    .toString()
});
