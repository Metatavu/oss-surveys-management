import { useEffect } from "react";
import wrapTemplate from "../pages/templates/template-wrapper";
import { parseHtmlToDom } from "../../utils/PreviewUtils";
import { IframeClickEvent } from "../../types";

/**
 * Component props
 */
interface Props {
  htmlString: string;
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
 *
 * @param props component properties
 */
const Preview = ({
  htmlString,
  width,
  height,
  scale,
  onPanelPropertiesChange,
  pageNumber,
  selectedPage,
  setSelectedPage
}: Props) => {
  /**
   * Set up event listener to recieve post message from iframe
   */
  useEffect(() => {
    // TODO: In the future when we need more event handlers within the iframe we can use a switch statement to replace the handlePostMessageEventListener.
    // This can direct us to the appropriate event listener based upon the type of the Event e.g. IframeClickEvent, IframeButtonClickEvent etc.
    window.addEventListener(`message-${pageNumber}`, handlePostMessageEventListener);

    return () => window.removeEventListener(`message-${pageNumber}`, handlePostMessageEventListener);
  },[]);

  /**
   * Handles post messsage event from iframe
   *
   * @param event message event
   */
  const handlePostMessageEventListener = (event: any) => {
    if (!onPanelPropertiesChange || !setSelectedPage) return;

    const typedEvent = event as IframeClickEvent;

    onPanelPropertiesChange();
    setSelectedPage(typedEvent.detail.pageNumber);
  };

  return (
    <div style={{ scale: String(scale) }}>
      <iframe
        srcDoc={ wrapTemplate(parseHtmlToDom(htmlString).outerHTML, pageNumber) }
        width={ width }
        height={ height }
        seamless
        style={{ border: selectedPage === pageNumber ? "20px solid #46dc78" : "none" }}
      />
    </div>
  )
};

export default Preview;