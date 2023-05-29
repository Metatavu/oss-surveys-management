import { AbstractQuestionRenderer } from "../utils/question-utils";

/**
 * Class for SingleSelectTextQuestionRenderer
 */
export class SingleSelectTextQuestionRenderer extends AbstractQuestionRenderer {
  /**
   * Convert single question type option into html buttons
   *
   * @param option option
   * @returns html string
   */
  public render = (option: string): string => `<button class="option">${option}</button>`;
}
