import { AbstractRenderer } from "./abstract-renderer";

/**
 * Paragraph Renderer
 */
export class ParagraphRenderer extends AbstractRenderer {
  /**
   * Renders a dev element containing given value split by line breaks as p elements.
   *
   * @param value display text
   * @returns html string
   */
  public render = (value: string): string => {
    const lines = value.split("\n");
    const pTags = lines
      .map((line) => {
        if (line.trim() === "") return "<p>&nbsp;</p>";

        return `<p>${line}</p>`;
      })
      .join("");
    return pTags;
  };
}
