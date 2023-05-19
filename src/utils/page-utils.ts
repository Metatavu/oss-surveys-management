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
  export const getPageTextElementTypeAndId = (
    layoutHtml: string,
    id: string
  ): EditablePageElement => {
    const body = new DOMParser().parseFromString(layoutHtml, "text/html").body;
    const foundElement = findHtmlElementById(body, id);

    return {
      type: foundElement?.tagName.toLowerCase() as PageElementType,
      element: foundElement!,
      id: id
    };
  };

  /**
   * Finds element from HTML by id
   *
   * @param id id
   * @returns element
   */
  const findHtmlElementById = (element: Element, id: string): Element | undefined => {
    const elementId = element.id;

    if (elementId === id) {
      return element;
    }

    const children = element.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const foundElement: Element | undefined = findHtmlElementById(child, id);

      if (foundElement) {
        return foundElement;
      }
    }

    return;
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
}

export type EditablePageElement = {
  type: PageElementType;
  element: Element;
  id: string;
};

export enum PageElementType {
  H1 = "h1",
  P = "p",
  DIV = "div"
}

export const EDITABLE_TEXT_PAGE_ELEMENTS = [PageElementType.H1, PageElementType.P];
export const QUESTION_PLACEHOLDER_DATA_COMPONENT = "question";

export default PageUtils;
