import { QuestionType } from "../types";
import { SingleSelectTextQuestionRenderer } from "./single-question-renderer";

/**
 * Class for QuestionRendererFactory
 */
class QuestionRendererFactory {
  /**
   * Get renderer based on question type
   *
   * @param questionType QuestionType
   * @returns
   */
  public getRenderer = (questionType: QuestionType) => {
    switch (questionType) {
      case QuestionType.SINGLE:
        return new SingleSelectTextQuestionRenderer();
      default:
        throw new Error(`Could not find renderer for ${questionType}`);
    }
  };
}

const questionRendererFactory = new QuestionRendererFactory();
export default questionRendererFactory;
