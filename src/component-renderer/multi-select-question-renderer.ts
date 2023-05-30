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
  public render = (value: string): string => `<div class="option">${value}</div>`;
}
