import sanitizeHtml, { IOptions } from "sanitize-html";

/**
 * Options for html sanitizer
 */
const sanitizeOptions: IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "button",
    "h1",
    "p",
    "div",
    "label",
    "input",
    "img",
    "svg",
    "path",
    "g"
  ]),
  allowedAttributes: {
    "*": ["style", "id", "class", "src", "viewbox", "fill", "d"]
  }
};

/**
 * Wrap and sanitize template HTML body content
 *
 * @param bodyContent
 * @param pageId page id
 * @returns HTML string
 */
const wrapTemplate = (bodyContent: string, pageId?: string) => `<!DOCTYPE html>
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
        padding: 10% 215px 215px 10%;
        box-sizing: border-box;
        background-size: cover;
      }
      .page.text-shadow {
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      }
      .logo-container {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        height: 215px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg.logo {
        height: 140px;
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
        justify-content: center;
        gap: 5%;
      }
      .img-wrapper {
        display: flex;
        flex: 1;
        justify-content: center;
        margin-top: 10%;
        width: 100%;
      }
      .option {
        width: 100%;
        box-sizing: border-box;
        padding: 30px 20px;
        font-size: 2.5rem;
        font-family: 'SBonusText-Bold';
        text-align: center;
        color: #fff;
        background: transparent;
        border: 4px solid #fff;
        transition: background-color 0.2s ease-in-out;
      }
      .multi-option {
        position: relative;
        width: 100%;
        padding: 20px 0 20px 130px;
        box-sizing: border-box;
        font-size: 2.5rem;
        line-height: 150%;
        font-family: 'SBonusText-Bold';
        color: #fff;
        background: transparent;
        transition: background-color 0.2s ease-in-out;
      }
      .multi-option:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 80px;
        width: 80px;
        border: 4px solid #fff;
        transition: background-color 0.2s ease-in-out;
      }
      .multi-option.selected:before {
        background-color: #fff
      }
      .multi-option.selected:after {
        content: "✓";
        position: absolute;
        left: 26px;
        top: 50%;
        color: #00AA46;
        transform: translateY(-50%);
      }
      .next-button {
        background-color: transparent;
        border: none;
        color: #ffffff;
        height: 100%;
        width: 215px;
        position: absolute;
        top: 0;
        right: 0;
        transition: background-color 0.2s ease-in-out;
      }
      .next-button:active, option:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
      svg.next-icon {
        margin-top: 600px;
        height: 100px;
        width: 100px;
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
          "message-${pageId}",
          {
            detail: {
              eventType: "iframeclick",
              pageId: "${pageId}"
            }
          }
        )
      )
    );
  </script>
  </html>`;

export default wrapTemplate;
