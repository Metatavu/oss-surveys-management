import wrapTemplate from "../pages/templates/template-wrapper";

/**
 * Component props
 */
interface Props {
  htmlString: string;
  width: number;
  height: number;
  scale: number;
}

/**
 * Renders preview component
 */
const Preview = ({ htmlString, width, height, scale }: Props) => {

  /**
   * Parse HTML string to dom element
   *
   * @param html string
   */
  const parseHtmlToDom = (html: string) => {
    return new DOMParser().parseFromString(html, "text/html").body;
  };

  return (
    <div style={{ scale: String(scale) }}>
      <iframe
        srcDoc={ wrapTemplate(parseHtmlToDom(htmlString).outerHTML) }
        width={ width }
        height={ height }
        seamless
      />
    </div>
  )
};

export default Preview;