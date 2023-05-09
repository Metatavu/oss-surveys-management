import { useEffect } from "react";
import wrapTemplate from "../pages/templates/template-wrapper";
import { parseHtmlToDom } from "../../utils/PreviewUtils";

/**
 * Component props
 */
interface Props {
  htmlString?: string;
  width: number;
  height: number;
  scale: number;
  onPanelPropertiesChange?: () => void;
  pageNumber?: number;
  selectedPage?: number;
  setSelectedPage?: (pageNumber: number) => void;
}

/**
 * Renders preview component
 */
const Preview = ({ htmlString, width, height, scale, onPanelPropertiesChange, pageNumber, selectedPage, setSelectedPage }: Props) => {
  if (!htmlString) return null;

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
  const handlePostMessageEventListener = (event: MessageEvent<string>) => {
    if (!onPanelPropertiesChange || !setSelectedPage) return;

    if (typeof event.data === "string" && event.data.includes("iFrameClick-")) {
      const messagePage = event.data.match(/\d+/g)?.join();

      if (!messagePage!) return;

      const messagePageNumber = parseInt(messagePage);

      if (messagePageNumber && messagePageNumber === pageNumber) {
        onPanelPropertiesChange();
        setSelectedPage(messagePageNumber);
      }
    }
  };

  return (
    <div style={{ scale: String(scale) }}>
      <iframe
        srcDoc={ wrapTemplate(parseHtmlToDom(htmlString).outerHTML, pageNumber) }
        width={ width }
        height={ height }
        seamless
        style={{ border: selectedPage === pageNumber ? "10px solid #000" : "none" }}
      />
    </div>
  )
};

export default Preview;