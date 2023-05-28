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
  public render = (value: string): string =>
    `<button class="option" style="margin-bottom: 3rem;">${value}</button>`;
}
