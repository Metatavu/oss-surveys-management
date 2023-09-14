import { AbstractRenderer } from "./abstract-renderer";

/**
 * Multi Select Question Renderer
 */
export class MultiSelectQuestionRenderer extends AbstractRenderer {
  /**
   * Renders an HTML div element with given value as its text.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => {
    const lines = value.split("\n");
    const checkboxContent = lines
      .map((line) => {
        if (line.trim() === "") return "<br/>";

        return `<div>${line}</div>`;
      })
      .join("<br/>");
    return `<div class="multi-option">${checkboxContent}</div>`;
  };
}
