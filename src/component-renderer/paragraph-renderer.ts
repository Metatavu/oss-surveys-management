import { AbstractRenderer } from "./abstract-renderer";

/**
 * Paragraph Renderer
 */
export class ParagraphRenderer extends AbstractRenderer {
  /**
   * Renders an HTML paragraph element with given value as its text.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => `<p>${value}</p>`;
}
