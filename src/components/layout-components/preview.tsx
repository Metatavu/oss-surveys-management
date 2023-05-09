import { useEffect } from "react";
import wrapTemplate from "../pages/templates/template-wrapper";

/**
 * Component props
 */
interface Props {
  htmlString?: string;
  width: number;
  height: number;
  scale: number;
  onPanelPropertiesChange: () => void;
  pageNumber: number;
  selectedPage?: number;
  setSelectedPage: (pageNumber: number) => void;
}

/**
 * Renders preview component
 */
const Preview = ({ htmlString, width, height, scale, onPanelPropertiesChange, pageNumber, selectedPage, setSelectedPage }: Props) => {
  if (!htmlString) return null;

  console.log("page number and selected page", pageNumber, selectedPage);

  /**
   * Set up event listener to recieve post message from iframe
   */
  useEffect(() => {
    window.addEventListener("message", handlePostMessageEventListener);

    return () => window.removeEventListener("message", handlePostMessageEventListener);
  },[]);

  /**
   * Handles post messsage event from iframe
   *
   * @param event message event
   */
  const handlePostMessageEventListener = (event: MessageEvent) => {
    // TODO: This could be secured using the origin from postMessage?
    if (event.data === "iFrameClick") {
      onPanelPropertiesChange();
      // TODO: This is not working to select a specific selected page
      // setSelectedPage(pageNumber);
      // console.log("selected page is set to ", pageNumber)
    }
  };

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
        style={{ border: selectedPage === pageNumber ? "10px solid #000" : "none" }}
      />
    </div>
  )
};

export default Preview;