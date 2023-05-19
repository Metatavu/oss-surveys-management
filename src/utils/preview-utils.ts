import { LayoutVariable, PageProperty } from "../generated/client";
import PageUtils from "./page-utils";

import { Background } from "../types";

/**
 * Parse HTML string to dom element
 *
 * @param html string
 * @param layoutVariables layout variables
 * @param pageProperties page properties
 */
export const parseHtmlToDom = (
  html: string,
  layoutVariables: LayoutVariable[],
  pageProperties: PageProperty[]
) => {
  const body = new DOMParser().parseFromString(html, "text/html").body;
  return body;
};

/**
 * TODO: ADD DOCS
 */
const updateHtmlElement = (element: Element, pageProperties: PageProperty[]) => {
  const elementId = element.id;
  const pageProperty = pageProperties.find((property) => property.key === elementId);
  console.log(pageProperty);
  if (pageProperty) {
    element.innerHTML = pageProperty.value;
  } else {
    const childrenCopy = [...element.children];
    for (const child of childrenCopy) {
      element.replaceChild(child, updateHtmlElement(child, pageProperties));
    }
  }

  return element;
};
