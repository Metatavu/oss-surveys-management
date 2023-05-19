import sanitizeHtml, { IOptions } from "sanitize-html";

/**
 * Options for html sanitizer
 */
const sanitizeOptions: IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["button", "h1", "p"]),
  allowedAttributes: {
    "*": ["style", "id"]
  }
};

/**
 * Wrap and sanitize template HTML body content
 *
 * @param bodyContent
 * @returns HTML string
 */
const wrapTemplate = (bodyContent: string, pageNumber?: number) => `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.metatavu.io/fonts/sok/fonts/stylesheet.css"/>
  </head>
  <body style="margin: 0;">
    ${sanitizeHtml(bodyContent, sanitizeOptions)}
  </body>
  <script>
    document.addEventListener("click", () =>
      window.parent.dispatchEvent(
        new CustomEvent(
          "message-${pageNumber}",
          {
            detail: {
              eventType: "iframeclick",
              pageNumber: ${pageNumber}
            }
          }
        )
      )
    )
  </script>
  </html>`;

export default wrapTemplate;
