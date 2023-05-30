/**
 * Abstract Renderer
 */
export abstract class AbstractRenderer {
  /**
   * Renders display text inside an HTML element.
   *
   * @param value display text
   */
  public abstract render(value: string): string;
}
