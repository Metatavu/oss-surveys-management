import strings from "../../../localization/strings";
import sanitizeHtml, { IOptions } from "sanitize-html";

// TODO: This may want refining
/**
 * Options for html sanitizer
 */
const sanitizeOptions: IOptions = {
  allowedTags: false,
  allowedAttributes: false
};

// TODO: This template needs styling
const titleAndQueryTemplate = (questions?: string) => {

const questionContent = questions || strings.editSurveysScreen.pages.noQuestion;

return (
    `<div style="background: #00AA46; color: #ffffff; height: 3840px; width: 100%; align-items: center; display: flex; flex-direction: column;">
      <h1 style="margin: 0; padding: 0; text-transform: uppercase; font-size: 20rem">Kiitos äänestäsi!</h1>
      <div style="width: 100%;">${ sanitizeHtml(questionContent, sanitizeOptions) }</div>
    </div>`
  )
};

export default titleAndQueryTemplate;