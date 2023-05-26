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
  public render = (option: string): string =>
    `<div class="options">
    <label style="font-size: 2rem; font-family: 'SBonusText-Bold'; color: #fff;" for="multi-${option}">${option}</label>
    <input id="multi-${option}" type="checkbox">
    </div>`;
}
