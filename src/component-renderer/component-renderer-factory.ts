import { PageQuestionType } from "../generated/client";
import { MultiSelectQuestionRenderer } from "./multi-select-question-renderer";
import { SingleSelectQuestionRenderer } from "./single-question-renderer";
import { ParagraphRenderer } from "./paragraph-renderer";
import { TitleRenderer } from "./title-renderer";

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
        return new SingleSelectQuestionRenderer();
      case PageQuestionType.MultiSelect:
        return new MultiSelectQuestionRenderer();
      default:
        throw new Error(`Could not find renderer for ${questionType}`);
    }
  };

  /**
   * Gets title renderer
   *
   * @returns Title renderer
   */
  public getTitleRenderer = () => new TitleRenderer();

  /**
   * Gets paragraph renderer
   *
   * @returns Paragraph renderer
   */
  public getParagraphRenderer = () => new ParagraphRenderer();
}

const componentRendererFactory = new ComponentRendererFactory();
export default componentRendererFactory;
