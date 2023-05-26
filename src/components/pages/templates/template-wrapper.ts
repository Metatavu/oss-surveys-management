import sanitizeHtml, { IOptions } from "sanitize-html";

/**
 * Options for html sanitizer
 */
const sanitizeOptions: IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["button", "h1", "p", "div"]),
  allowedAttributes: {
    "*": ["style", "id", "class"]
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
    <style>
      body {
        margin: 0;
      }
      .page {
        height: 100vh;
        width: 100vw;
        background-color: #00AA46;
        color: #ffffff;
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 10%;
        box-sizing: border-box;
      }
      .content {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      h1 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        font-family: SBonusDisplay-Black;
      }
      h1.sm {
        font-size: 4rem;
      }
      h1.md {
        font-size: 5rem;
      }
      h1.lg {
        font-size: 6rem;
      }
      p {
        font-family: SBonusDisplay-Regular;
        font-size: 4rem;
        line-height: 150%;
      }
      .options {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 2rem;
        margin-top: 10%;
        justify-content: center;
      }
      .option {
        width: 100%;
        padding: "30px 20px;
        font-size: 2.5rem;
        font-family: 'SBonusText-Bold';
        color: #fff;
        background: transparent;
        border: 4px solid #fff;
        transition: background-color 0.2s ease-in-out;
      }
      .next-button {
        align-self: flex-end;
        background-color: transparent;
        border: none;
        color: #ffffff;
        height: 80px;
        font-family: SBonusText-Bold;
        font-size: 2.5rem;
        transition: background-color 0.2s ease-in-out;
      }
      .next-button:active, option:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    </style>
  </head>
  <body>
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
