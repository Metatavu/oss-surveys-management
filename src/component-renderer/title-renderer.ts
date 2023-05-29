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
  public render = (title: string): string => `<h1 class="md">${title}</h1>`;
}
