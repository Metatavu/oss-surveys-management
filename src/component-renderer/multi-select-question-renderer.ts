import { AbstractQuestionRenderer } from "../utils/question-utils";

/**
 * Class for MultiSelectTextQuestionRenderer
 */
export class MultiSelectTextQuestionRenderer extends AbstractQuestionRenderer {
  /**
   * Convert multi question type option into html checkboxes
   *
   * @param option option
   * @returns html string
   */
  public render = (option: string): string => `
  <div class="multi-option">${option}</div>`;
}
