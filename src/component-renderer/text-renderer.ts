import { v4 as uuid } from "uuid";

/**
 * Class for TextRenderer
 */
export class TextRenderer {
  /**
   * Convert text into html
   *
   * @param text Text
   * @returns html string
   */
  public render(text: string): string {
    let htmlString = "";

    htmlString = `
                  <p
                    id="${uuid()}"
                    style="
                      line-height: 150%;
                      font-size: 8rem;
                      white-space: pre;
                      font-family: SBonusDisplay-Black;
                    "
                  >
                    ${text}
                  </p>
                `;

    return htmlString;
  }
}
