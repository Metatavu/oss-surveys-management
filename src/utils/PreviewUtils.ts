import { Question } from "../types";
import { v4 as uuid } from 'uuid';

/**
 * Convert single question type options into html buttons
 *
 * @param options Question array
 * @returns html string
 */
export const renderSingleQuestionOptionsAsHtml = (options: Question[]) => {
  let htmlString  = "";

  options.forEach(option => {
    if (!option.data) return ;

    htmlString = htmlString.concat(
      `<div>
        <button
          id="${ uuid() }"
          style="width: 100%; height: 100px; font-size: 5rem;"
        >
          ${ option.data }
        </button>
      </div>`)
  });

  return htmlString;
};