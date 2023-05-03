import { Question, QuestionType } from "../types";
import { v4 as uuid } from 'uuid';

/**
 * Interface for QuestionRendererOption
 */
interface QuestionRenderOptions {
  question: Question;
};

/**
 * Abstract class for QuestionRenderer
 */
abstract class AbstractQuestionRenderer {
  public abstract render (options: QuestionRenderOptions): string;
};

/**
 * Class for SingleSelectTextQuestionRenderer
 */
class SingleSelectTextQuestionRenderer extends AbstractQuestionRenderer {
  /**
   * Convert single question type options into html buttons
   *
   * @param options QuestionRenderOptions
   * @returns html string
   */
  public render(options: QuestionRenderOptions): string {
    let htmlString  = "";

    options.question.options.forEach(option => {
      if (!option.text) return ;

      htmlString = htmlString.concat(
        `<div>
          <button
            id="${ uuid() }"
            style="width: 100%; height: 100px; font-size: 5rem;"
          >
            ${ option.text }
          </button>
        </div>`)
    });

    return htmlString;
  }
};

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
        throw new Error(`Could not find renderer for ${questionType}`)
    }
  };
};

const questionRendererFactory = new QuestionRendererFactory();
export default questionRendererFactory;