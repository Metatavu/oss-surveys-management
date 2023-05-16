import { v4 as uuid } from "uuid";

/**
 * Class for PageTitleRenderer
 */
export class PageTitleRenderer {
  /**
   * Convert single question type options into html buttons
   *
   * @param title title
   * @returns html string
   */
  public render(title: string): string {
    let htmlString = "";

    htmlString = `
                  <h1
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
                  </h1>
                `;

    return htmlString;
  }
}
