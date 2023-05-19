import { useEffect, useState } from "react";
import wrapTemplate from "../pages/templates/template-wrapper";
import { parseHtmlToDom } from "../../utils/preview-utils";
import { IframeClickEvent } from "../../types";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import strings from "../../localization/strings";

/**
 * Component props
 */
interface Props {
  htmlString: string;
  width: number;
  height: number;
  scale: number;
  pageNumber?: number;
  selectedPage?: number;
  previewPage?: boolean;
  setSelectedPage?: (pageNumber: number) => void;
  onPanelPropertiesChange?: () => void;
  deletePage?: (pageNumber: number) => Promise<void>;
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
  pageNumber,
  selectedPage,
  previewPage,
  setSelectedPage,
  onPanelPropertiesChange,
  deletePage
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [pageMenuOpen, setPageMenuOpen] = useState(false);

  /**
   * Set up event listener to recieve post message from iframe
   */
  useEffect(() => {
    // TODO: In the future when we need more event handlers within the iframe we can use a switch statement to replace the handlePostMessageEventListener.
    // This can direct us to the appropriate event listener based upon the type of the Event e.g. IframeClickEvent, IframeButtonClickEvent etc.
    window.addEventListener(`message-${pageNumber}`, handlePostMessageEventListener);

    return () =>
      window.removeEventListener(`message-${pageNumber}`, handlePostMessageEventListener);
  }, []);

  /**
   * Handles post messsage event from iframe
   *
   * @param event message event
   */
  const handlePostMessageEventListener = (event: any) => {
    if (!(onPanelPropertiesChange && setSelectedPage)) return;

    const typedEvent = event as IframeClickEvent;

    onPanelPropertiesChange();
    setSelectedPage(typedEvent.detail.pageNumber);
  };

  /**
   * Handles page menu click
   *
   * @param event event
   */
  const handlePageMenuClick = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(target as HTMLElement);
    setPageMenuOpen(!pageMenuOpen);
  };

  return (
    <div style={{ scale: `${scale}`, position: "relative" }}>
      {!previewPage && (
        <IconButton
          onClick={handlePageMenuClick}
          sx={{ position: "absolute", top: 0, right: 0, zIndex: 100000, padding: 0, margin: 0 }}
        >
          <MoreHoriz sx={{ width: "12.5rem", height: "12.5rem" }} style={{ color: "#ffffff" }} />
        </IconButton>
      )}
      <iframe
        srcDoc={wrapTemplate(parseHtmlToDom(htmlString, [], []).outerHTML, pageNumber)}
        title="preview"
        width={width}
        height={height}
        seamless
        style={{ border: selectedPage === pageNumber ? "20px solid #46dc78" : "none" }}
      />
      {!previewPage && deletePage && pageNumber && (
        <Menu
          anchorEl={anchorEl}
          open={pageMenuOpen}
          onClose={() => setPageMenuOpen(!pageMenuOpen)}
        >
          <MenuItem onClick={() => deletePage(pageNumber)}>
            {strings.editSurveysScreen.deletePage}
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Preview;
