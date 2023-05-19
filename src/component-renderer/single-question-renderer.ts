import { AbstractQuestionRenderer } from "../utils/QuestionUtils";
import { v4 as uuid } from "uuid";

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
  public render = (option: string): string =>
    `<button
      id="${uuid()}"
      style="
        width: 100%;
        height: 250px;
        font-size: 6rem;
        font-family: 'SBonusText-Bold';
        color: #fff;
        background: transparent;
        border: 20px solid #fff;
        margin-bottom: 6rem;
      "
    >
      ${option}
    </button>`;
}
