import { v4 as uuid } from "uuid";

/**
 * Class for ButtonRenderer
 */
export class ButtonRenderer {
  /**
   * Convert button into html
   *
   * @param displayState Boolean
   * @returns html string
   */
  public render(displayState: boolean): string {
    let htmlString = "";

    htmlString = `
                  <button
                    id="${uuid()}"
                    style="
                    width: 100%;
                    background-color: transparent;
                    border: none;
                    color: #ffffff;
                    height: 250px;
                    font-family: SBonusText-Bold;
                    font-size: 6rem;
                    display: ${displayState === true ? "block" : "none"};
                  >
                    Seuraava
                  </button>
                `;

    return htmlString;
  }
}
