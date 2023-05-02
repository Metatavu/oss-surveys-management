import strings from "../../../localization/strings";
import { Question } from "../../../types";

// TODO: This template needs styling
const titleAndQueryTemplate = (question?: Question) => {

const questionContent = question || strings.editSurveysScreen.pages.noQuestion;

return (
    `<div style=" background: #00AA46; color: #ffffff; height: inherit; align-items: center; display: flex; flex-direction: column;">
      <h1 style="margin: 0; padding: 0; text-transform: uppercase;">Kiitos äänestäsi!</h1>
      <div>${ questionContent }</div>
    </div>`
  )
};

export default titleAndQueryTemplate;