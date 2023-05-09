/**
 * Parse HTML string to dom element
 *
 * @param html string
 */
export const parseHtmlToDom = (html: string) => {
  return new DOMParser().parseFromString(html, "text/html").body;
};