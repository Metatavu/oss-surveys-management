import { useEffect } from 'react';
import wrapTemplate from "../pages/templates/template-wrapper";

/**
 * Component props
 */
interface Props {
  htmlString: string;
  width: number;
  height: number;
  scale: number;
  onPanelPropertiesChange?: () => void;
}

/**
 * Renders preview component
 */
const Preview = ({ htmlString, width, height, scale, onPanelPropertiesChange }: Props) => {
  /**
   * Set up event listener to recieve post message from iframe
   */
  useEffect(() => {
    if (onPanelPropertiesChange) {
      window.addEventListener("message", handlePostMessageEventListener);

      return () => window.removeEventListener("message", handlePostMessageEventListener);
    }
  },[]);

  /**
   * Handles post messsage event from iframe
   *
   * @param event message event
   */
  const handlePostMessageEventListener = (event: MessageEvent) => {
    if (onPanelPropertiesChange) {
      if (event.data === "iFrameClick") {
        onPanelPropertiesChange();
      }
      else {
        // Proof of concept for clicking specific elements within iframe
        console.log("button click", event)
      }
    }
  };

  /**
   * Parse HTML string to dom element
   *
   * @param html string
   */
  const parseHtmlStringToDom = (html: string) => {
    return new DOMParser().parseFromString(html, "text/html").body;
  };

  return (
    <div style={{ scale: String(scale) }}>
      <iframe
        srcDoc={ wrapTemplate(parseHtmlStringToDom(htmlString).outerHTML) }
        width={ width }
        height={ height }
        seamless
      />
    </div>
  )
};

export default Preview;