/**
 * Parse HTML string to dom element
 *
 * @param html string
 */
export const parseHtmlToDom = (html: string) => {
  const body = new DOMParser().parseFromString(html, "text/html").body;
  const image = "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?w=3084&h=2160";
  (body.children[0] as HTMLElement).style.setProperty("background-image", `url("${image}")`);
  console.log("BODYYYY", body.children[0]);
  return body;
};
