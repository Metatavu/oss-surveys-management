import sanitizeHtml, { IOptions } from "sanitize-html";

// TODO: These options need refining
/**
 * Options for html sanitizer
 */
const sanitizeOptions: IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["button"]),
  allowedAttributes: {
    "*": ["style"],
  }
};

/**
 * Wrap and sanitize template HTML body content
 *
 * @param bodyContent
 * @returns HTML string
 */
const wrapTemplate = (bodyContent: string) => (
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="margin: 0;">
    ${ sanitizeHtml(bodyContent, sanitizeOptions) }
  </body>
  <script>
    document.addEventListener("click", () =>
      window.parent.postMessage("iFrameClick")
    )
  </script>
  </html>`
);

export default wrapTemplate;