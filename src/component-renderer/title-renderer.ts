import { v4 as uuid } from "uuid";
import { AbstractQuestionRenderer } from "../utils/question-utils";

/**
 * Class for PageTitleRenderer
 */
export class PageTitleRenderer extends AbstractQuestionRenderer {
  /**
   * Convert page title text to html string
   *
   * @param title title
   * @returns html string
   */
  public render = (title: string): string => `<h1 class="lg">${title}</h1>`;
}
