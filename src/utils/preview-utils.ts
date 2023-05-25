/**
 * Parse HTML string to dom element
 *
 * @param html string
 * @param layoutVariables layout variables
 * @param pageProperties page properties
 */
export const parseHtmlToDom = (html: string) => {
  return new DOMParser().parseFromString(html, "text/html").body;
};
