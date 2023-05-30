import { AbstractRenderer } from "./abstract-renderer";

/**
 * Title Renderer
 */
export class TitleRenderer extends AbstractRenderer {
  /**
   * Renders an HTML h1 element with given value as its text.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => `<h1 class="md">${value}</h1>`;
}
