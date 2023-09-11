import { AbstractRenderer } from "./abstract-renderer";

/**
 * Title Renderer
 */
export class TitleRenderer extends AbstractRenderer {
  /**
   * Renders a div element with given value split by line breaks as its h1 elements.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => {
    const lines = value.split("\n");
    const h1Tags = lines
      .map((line) => {
        if (line.trim() === "") return "<h1>&nbsp;</h1>";
        // TODO: Using the above a BR not working on device?
        // if (line.trim() === "") return "<br/>";

        return `<h1 class="md">${line}</h1>`;
      })
      .join("\n");
    return `<div>${h1Tags}</div>`;
  };
}
