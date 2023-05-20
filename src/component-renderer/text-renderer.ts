import { v4 as uuid } from "uuid";
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
  public render = (text: string): string =>
    `<p
      id="${uuid()}"
      style="
        margin: 0;
        padding: 0;
        line-height: 150%;
        font-size: 8rem;
        white-space: pre-line;
        font-family: SBonusDisplay-Regular;
      "
    >
      ${text}
    </p>`;
}
