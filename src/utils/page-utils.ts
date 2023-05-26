import componentRendererFactory from "../component-renderer/component-renderer-factory";
import {
  LayoutVariable,
  LayoutVariableType,
  PageProperty,
  PageQuestion
} from "../generated/client";
import { PageElementType } from "../types";
import strings from "../localization/strings";
import { QUESTION_PLACEHOLDER_DATA_COMPONENT } from "../constants";

/**
 * Namespace for Page utilities
 */
namespace PageUtils {
  /**
   * Gets page text element type and id
   *
   * @param layoutHtml layout html
   * @param id id
   * @returns page text element type and id
   */
  export const getPageTextElementTypeAndId = (layoutHtml: string, id: string) => {
    const dom = new DOMParser().parseFromString(layoutHtml, "text/html");
    const foundElement = dom.getElementById(id);

    if (!foundElement) throw new Error(`Element with id ${id} not found`);

    return {
      type: foundElement?.tagName.toLowerCase() as PageElementType,
      element: foundElement,
      id: id
    };
  };

  /**
   * Checks if page has questions placeholder
   *
   * @param layoutHtml layout html
   * @returns true if page has questions placeholder
   */
  export const hasQuestionsPlaceholder = (layoutHtml?: string): boolean => {
    if (!layoutHtml) return false;
    const body = new DOMParser().parseFromString(layoutHtml, "text/html").body;
    const divElements = body.getElementsByTagName("div");
    let hasQuestionsPlaceholder = false;

    for (const element of divElements) {
      const dataComponentAttribute = element.attributes.getNamedItem("data-component")?.nodeValue;

      hasQuestionsPlaceholder = dataComponentAttribute === QUESTION_PLACEHOLDER_DATA_COMPONENT;
    }

    return hasQuestionsPlaceholder;
  };

  /**
   * Handles page questions rendering
   *
   * @param document document
   * @param page page
   */
  export const handlePageQuestionsRendering = (document: Document, pageQuestion: PageQuestion) => {
    let htmlData = "";
    const questionRenderer = componentRendererFactory.getQuestionRenderer(pageQuestion.type);
    const questionPlaceholder = document.querySelector("div[data-component='question']");
    for (const option of pageQuestion.options) {
      const questionHtml = questionRenderer.render(option.questionOptionValue);
      const questionElement = new DOMParser().parseFromString(questionHtml, "text/html");
      questionPlaceholder?.appendChild(questionElement.body);
      htmlData = document.body.innerHTML;
    }

    return htmlData;
  };

  /**
   * Handles page properties rendering
   */
  export const handlePagePropertiesRendering = (
    document: Document,
    variable: LayoutVariable,
    property: PageProperty
  ) => {
    let htmlData = document.body.outerHTML;
    switch (variable.type) {
      case LayoutVariableType.Text: {
        const targetElement = document.getElementById(variable.key);
        switch (targetElement?.tagName.toLocaleLowerCase()) {
          case PageElementType.H1: {
            const titleRenderer = componentRendererFactory.getTitleRenderer();
            const textHtml = titleRenderer.render(property.value);
            const textElement = new DOMParser().parseFromString(textHtml, "text/html");
            targetElement?.replaceWith(textElement.body);
            htmlData = document.body.innerHTML;
            break;
          }
          case PageElementType.P: {
            const textRenderer = componentRendererFactory.getTextRenderer();
            const textHtml = textRenderer.render(property.value);
            const textElement = new DOMParser().parseFromString(textHtml, "text/html");
            targetElement?.replaceWith(textElement.body);
            htmlData = document.body.innerHTML;
            break;
          }
        }
      }
    }

    return htmlData;
  };

  /**
   * Gets default question option with placeholder and provided order number
   *
   * @param orderNumber order number
   * @returns page question option
   */
  export const getDefaultQuestionOption = (orderNumber: number) => ({
    orderNumber: orderNumber,
    questionOptionValue: strings
      .formatString(strings.editSurveysScreen.editPagesPanel.answerOptionPlaceholder, orderNumber)
      .toString()
  });
}

export default PageUtils;
