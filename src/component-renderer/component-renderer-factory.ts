import { PageQuestionType } from "../generated/client";
import { SingleSelectTextQuestionRenderer } from "./single-question-renderer";
import { TextRenderer } from "./text-renderer";
import { PageTitleRenderer } from "./title-renderer";

/**
 * Class for ComponentRendererFactory
 */
class ComponentRendererFactory {
  /**
   * Get question renderer based on question type
   *
   * @param questionType QuestionType
   * @returns QuestionRenderer
   */
  public getQuestionRenderer = (questionType: PageQuestionType) => {
    switch (questionType) {
      case PageQuestionType.SingleSelect:
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
}

const questionRendererFactory = new ComponentRendererFactory();
export default questionRendererFactory;
