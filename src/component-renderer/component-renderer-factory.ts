import { QuestionType } from "../types";
import { BackgroundRenderer } from "./background-renderer";
import { ButtonRenderer } from "./button-renderer";
import { SingleSelectTextQuestionRenderer } from "./single-question-renderer";
import { TextRenderer } from "./text-renderer";
import { PageTitleRenderer } from "./title-renderer";

/**
 * Class for ComponentRendererFactory
 */
class ComponentRendererFactory {
  /**
   * Get renderer based on question type
   *
   * @param questionType QuestionType
   * @returns QuestionRenderer
   */
  public getRenderer = (questionType: QuestionType) => {
    switch (questionType) {
      case QuestionType.SINGLE:
        return new SingleSelectTextQuestionRenderer();
      default:
        throw new Error(`Could not find renderer for ${questionType}`);
    }
  };

  /**
   * Get title renderer
   *
   * @returns Title renderer
   */
  public getTitleRenderer = () => {
    return new PageTitleRenderer();
  };

  /**
   * Get text renderer
   *
   * @returns Text renderer
   */
  public getTextRenderer = () => {
    return new TextRenderer();
  };

  /**
   * Get button renderer
   *
   * @returns Next button renderer
   */
  public getNextButtonRenderer = () => {
    return new ButtonRenderer();
  };

  /**
   * Get background renderers
   *
   * @returns Background renderer
   */
  public getBackgroundRenderer = () => {
    return new BackgroundRenderer();
  };
}

const questionRendererFactory = new ComponentRendererFactory();
export default questionRendererFactory;
