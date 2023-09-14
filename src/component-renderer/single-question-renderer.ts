import { AbstractRenderer } from "./abstract-renderer";
// TODO: Should rename as will no longer be rendering, but serializing and used for saving
/**
 * Single Select Question Renderer
 */
export class SingleSelectQuestionRenderer extends AbstractRenderer {
  /**
   * Renders an HTML button element with given value as its text.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => {
    const lines = value.split("\n");
    const buttonContent = lines
      .map((line) => {
        if (line.trim() === "") return "<br>";

        return line;
      })
      .join("<br>");
    return `<div class="option">${buttonContent}</div>`;
  };
}
