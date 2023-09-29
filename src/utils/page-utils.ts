import config from "../app/config";
import componentRendererFactory from "../component-renderer/component-renderer-factory";
import {
  IMAGES,
  IMAGE_PLACEHOLDER_DATA_COMPONENT,
  QUESTION_PLACEHOLDER_DATA_COMPONENT
} from "../constants";
import {
  LayoutVariable,
  LayoutVariableType,
  PageProperty,
  PageQuestion
} from "../generated/client";
import strings from "../localization/strings";
import { Background, EditablePageElement, PageElementType } from "../types";

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
    const divElements = [...body.getElementsByTagName("div")];

    return divElements.some(
      (element) =>
        element.attributes.getNamedItem("data-component")?.nodeValue ===
        QUESTION_PLACEHOLDER_DATA_COMPONENT
    );
  };

  /**
   * Checks if page has image placeholder
   *
   * @param layoutHtml layout html
   * @returns true if page has image placeholder
   */
  export const hasImagePlaceholder = (layoutHtml?: string): boolean => {
    if (!layoutHtml) return false;
    const body = new DOMParser().parseFromString(layoutHtml, "text/html").body;
    const imgElements = [...body.getElementsByTagName("img")];

    return imgElements.some(
      (element) =>
        element.attributes.getNamedItem("data-component")?.nodeValue ===
        IMAGE_PLACEHOLDER_DATA_COMPONENT
    );
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
    const targetElement = document.getElementById(variable.key);

    if (!targetElement) return htmlData;

    switch (variable.type) {
      case LayoutVariableType.Text: {
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
            const textRenderer = componentRendererFactory.getParagraphRenderer();
            const textHtml = textRenderer.render(property.value);
            const textElement = new DOMParser().parseFromString(textHtml, "text/html");
            targetElement?.replaceWith(textElement.body);
            htmlData = document.body.innerHTML;
            break;
          }
        }
      }
      case LayoutVariableType.ImageUrl: {
        switch (targetElement?.tagName.toLocaleLowerCase()) {
          case PageElementType.DIV: {
            targetElement.style.setProperty(
              "background-image",
              `url('${config.imageBaseUrl + property.value}')`
            );
            htmlData = document.body.innerHTML;
            break;
          }
          case PageElementType.IMG: {
            (targetElement as HTMLImageElement).src = config.imageBaseUrl + property.value;
            targetElement.style.setProperty("height", "50%");
            targetElement.style.setProperty("width", "auto");
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

  /**
   * Gets text property label based on page element type
   */
  export const getTextPropertyLabel = (type: PageElementType) => {
    if (type === PageElementType.H1) {
      return strings.editSurveysScreen.editPagesPanel.title;
    }
    if (type === PageElementType.P) {
      return strings.editSurveysScreen.editPagesPanel.infoText;
    }

    return "";
  };

  /**
   * Returns pages background
   *
   * @param elements elements
   * @param properties properties
   */
  export const getPageBackground = (
    elements: EditablePageElement[],
    properties?: PageProperty[]
  ) => {
    const defaultBackground = IMAGES.find((image) => image.key === Background.GREEN);
    if (!defaultBackground) return;
    if (!elements?.length) return defaultBackground.value;
    const foundBackgroundElement = elements.find((element) => element.type === PageElementType.DIV);
    if (!foundBackgroundElement) return defaultBackground.value;
    const foundBackgroundProperty = properties?.find(
      (property) => property.key === foundBackgroundElement.id
    );
    if (!foundBackgroundProperty?.value) return defaultBackground.value;

    return foundBackgroundProperty.value;
  };

  /**
   * Returns page image
   */
  export const getPageImage = (elements: EditablePageElement[], properties?: PageProperty[]) => {
    const defaultImage = IMAGES.find((image) => image.key === Background.GREEN);
    if (!defaultImage) return;
    if (!elements?.length) return defaultImage.value;
    const foundImageElement = elements.find((element) => element.type === PageElementType.IMG);
    if (!foundImageElement) return defaultImage.value;
    const foundImageProperty = properties?.find(
      (property) => property.key === foundImageElement.id
    );
    if (!foundImageProperty?.value) return defaultImage.value;

    return foundImageProperty.value;
  };
}

export default PageUtils;
