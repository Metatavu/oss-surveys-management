import { v4 as uuid } from "uuid";

/**
 * Class for BackgroundRenderer
 */
export class BackgroundRenderer {
  /**
   * Convert background into html
   *
   * @param background background
   * @returns html string
   */
  public render(background: string): string {
    let htmlString = "";

    htmlString = `
                  <div
                    id="${uuid()}"
                    style="
                      height: 100vh;
                      width: 100vw;
                      background-color: ${background};
                      color: #ffffff;
                      display: flex;
                      flex: 1;
                      flex-direction: column;
                      padding: 10%;
                      box-sizing: border-box;
                  >
                  </div>
                `;

    return htmlString;
  }
}
