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
  public render = (title: string): string =>
    `<h1
      id="${uuid()}"
      style="
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        font-size: 12rem;
        font-family: SBonusDisplay-Black;
      "
      >
      ${title}
    </h1>`;
}
