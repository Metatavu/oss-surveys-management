import { AbstractRenderer } from "./abstract-renderer";
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

        return `<div>${line}</div>`;
      })
      .join("");
    return `<div class="option">${buttonContent}</div>`;
  };
}
