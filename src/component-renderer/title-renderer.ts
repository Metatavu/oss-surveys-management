import { AbstractRenderer } from "./abstract-renderer";

/**
 * Title Renderer
 */
export class TitleRenderer extends AbstractRenderer {
  /**
   * Renders a div element with given value as its h1 contents.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => {
    const lines = value.split("\n");
    const h1Tags = lines
      .map((line) => {
        if (line.trim() === "") return "<br/>";

        return `<h1 class="md">${line}</h1>`;
      })
      .join("\n");
    return `<div>${h1Tags}</div>`;
  };
}
