import config from "../app/config";
import componentRendererFactory from "../component-renderer/component-renderer-factory";
import {
  IMAGE_PLACEHOLDER_DATA_COMPONENT,
  PAGE_BACKGROUNDS,
  PAGE_IMAGES,
  QUESTION_PLACEHOLDER_DATA_COMPONENT
} from "../constants";
import {
  Layout,
  LayoutVariable,
  LayoutVariableType,
  PageProperty,
  PageQuestion,
  PageQuestionType
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

    if (foundElement.hasAttribute("data-component")) {
      const dataComponentValue = foundElement.getAttribute("data-component");
      if (dataComponentValue === "header-container" || dataComponentValue === "text-container") {
        return {
          type: foundElement?.children[0].tagName.toLowerCase() as PageElementType,
          element: foundElement,
          id: id
        };
      }
    }

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
   * @param pageQuestion pageQuestion
   */
  export const handlePageQuestionsRendering = (document: Document, pageQuestion: PageQuestion) => {
    let htmlData = "";
    const questionRenderer = componentRendererFactory.getQuestionRenderer(pageQuestion.type);
    const questionPlaceholder = document.querySelector("div[data-component='question']");

    for (const option of pageQuestion.options) {
      // This check is to ensure back compatability with values not changed since switch to storing values as serialized HTML, should not be needed after value to serialized migration?
      // TODO: Check to be improved if needed
      const questionHtml = option.questionOptionValue.includes("<")
        ? option.questionOptionValue
        : questionRenderer.render(option.questionOptionValue);

      const questionElement = new DOMParser().parseFromString(questionHtml, "text/html");
      questionPlaceholder?.appendChild(questionElement.body.children[0]);
    }
    htmlData = document.body.innerHTML;

    return htmlData;
  };

  /**
   * Handle page properties rendering
   *
   * @param document DOM Document
   * @param variable LayoutVariable
   * @param property PageProperty
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
        const textElement = new DOMParser().parseFromString(property.value, "text/html");
        targetElement?.replaceWith(textElement.body);
        htmlData = document.body.innerHTML;
        break;
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

  // TODO: This can be reverted to no use questionType if wrapper div does not need to contain the question type class
  /**
   * Gets default question option with placeholder and provided order number
   *
   * @param orderNumber order number
   * @returns page question option
   */
  export const getDefaultQuestionOption = (orderNumber: number, questionType: PageQuestionType) => {
    const optionString = strings
      .formatString(strings.editSurveysScreen.editPagesPanel.answerOptionPlaceholder, orderNumber)
      .toString();

    const serializedQuestionOptionValue = serializeValue(optionString, questionType);

    return {
      orderNumber: orderNumber,
      questionOptionValue: serializedQuestionOptionValue
    };
  };

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
    const defaultBackground = PAGE_BACKGROUNDS.find(
      (background) => background.key === Background.DEFAULT
    );
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
    const defaultImage = PAGE_IMAGES.find((image) => image.key === Background.DEFAULT);
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

  /**
   * Serialize the event value as HTML according to element type
   *
   * @param value event string
   * @param elementType PageElementType
   *
   * @returns serialized HTML
   */
  export const serializeValue = (
    value: string,
    elementType: PageElementType | PageQuestionType
  ) => {
    switch (elementType) {
      case PageElementType.P: {
        const textRenderer = componentRendererFactory.getParagraphRenderer();
        const textSerializedHtml = textRenderer.render(value);

        return textSerializedHtml;
      }
      case PageElementType.H1: {
        const titleRenderer = componentRendererFactory.getTitleRenderer();
        const headerSerializedHtml = titleRenderer.render(value);

        return headerSerializedHtml;
      }
      case PageQuestionType.MultiSelect: {
        const multiOptionRenderer = componentRendererFactory.getQuestionRenderer(elementType);
        const multiOptionSerializedHtml = multiOptionRenderer.render(value);

        return multiOptionSerializedHtml;
      }
      case PageQuestionType.SingleSelect: {
        const singleOptionRenderer = componentRendererFactory.getQuestionRenderer(elementType);
        const singleOptionSerializedHtml = singleOptionRenderer.render(value);

        return singleOptionSerializedHtml;
      }
      default:
        return value;
    }
  };

  /**
   * Converts serialized HTML to string of innerHTML values
   *
   * @param serializedHTML
   * @param elementType
   *
   * @returns string of innerHTML valuess
   */
  export const getSerializedHTMLInnerHtmlValues = (
    serializedHTML: string,
    elementType: PageElementType | PageQuestionType
  ) => {
    // TODO: Temporary condition while implementing serialization for different element types, remove when migration is ready.
    if (
      elementType !== PageElementType.P &&
      elementType !== PageElementType.H1 &&
      elementType !== PageQuestionType.SingleSelect &&
      elementType !== PageQuestionType.MultiSelect
    )
      return serializedHTML;

    const tempContainer = document.createElement("div");

    tempContainer.innerHTML =
      elementType === PageQuestionType.SingleSelect || elementType === PageQuestionType.MultiSelect
        ? serializedHTML
        : `<div>${serializedHTML}</div>`;

    const tempDiv = tempContainer.querySelector("div");

    if (!tempDiv) return serializedHTML;

    const innerHTMLValues: string[] = [];

    tempDiv.childNodes.forEach((childNode) => {
      if (childNode instanceof Element) {
        const lineBreakCleanInnerHTML = childNode.innerHTML.replace(/&nbsp;/g, "");
        innerHTMLValues.push(lineBreakCleanInnerHTML);
      }
    });
    const resultString = innerHTMLValues.join("\n");

    return resultString;
  };

  /**
   * Produces serialized HTML from new page layout variables
   *
   * @param foundLayout Layout
   * @param variable LayoutVariable
   * @returns serializedHtml
   */
  export const getNewPageSerializedValues = (foundLayout: Layout, variable: LayoutVariable) => {
    const elementType = getPageTextElementTypeAndId(foundLayout.html, variable.key).type;
    const stringValue = getTextPropertyLabel(elementType);

    return serializeValue(stringValue, elementType);
  };
}

export default PageUtils;
