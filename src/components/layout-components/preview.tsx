/**
 * Component props
 */
interface Props {
  htmlString: string;
}

/**
 * Renders preview component
 */
const Preview = ({ htmlString }: Props) => {

  /**
   * Parse HTML string to dom element
   *
   * @param html string
   */
  const parseHtmlToDom = (html: string) => {
    return new DOMParser().parseFromString(html, "text/html").body;
  };

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: parseHtmlToDom(htmlString).outerHTML
      }}
    />
  )
};

export default Preview;