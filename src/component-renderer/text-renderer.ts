import { AbstractQuestionRenderer } from "../utils/question-utils";

/**
 * Class for TextRenderer
 */
export class TextRenderer extends AbstractQuestionRenderer {
  /**
   * Convert text into html
   *
   * @param text Text
   * @returns html string
   */
  public render = (text: string): string => `<p>${text}</p>`;
}
