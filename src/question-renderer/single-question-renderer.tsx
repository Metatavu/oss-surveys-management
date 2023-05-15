import { AbstractQuestionRenderer } from "../utils/QuestionUtils";
import { v4 as uuid } from "uuid";

/**
 * Class for SingleSelectTextQuestionRenderer
 */
export class SingleSelectTextQuestionRenderer extends AbstractQuestionRenderer {
  /**
   * Convert single question type options into html buttons
   *
   * @param options QuestionRenderOptions
   * @returns html string
   */
  public render(options: string[]): string {
    let htmlString = "";

    options.forEach((option) => {
      htmlString = htmlString.concat(
        `<div>
          <button
            id="${uuid()}"
            style="
              width: 100%;
              height: 250px;
              font-size: 6rem;
              font-family: 'SBonusText-Bold';
              color: #fff;
              background: transparent;
              border: 20px solid #fff;
            "
          >
            ${option}
          </button>
        </div>`
      );
    });

    return htmlString;
  }
}