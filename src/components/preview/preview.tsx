import { useEffect, useState } from "react";
import wrapTemplate from "../pages/templates/template-wrapper";
import { parseHtmlToDom } from "../../utils/preview-utils";
import { IframeClickEvent } from "../../types";
import { IconButton, Menu, MenuItem, Stack, Typography, styled } from "@mui/material";
import { Add, MoreHoriz } from "@mui/icons-material";
import strings from "../../localization/strings";
import { Page, PageQuestionType } from "../../generated/client";
import PageUtils from "../../utils/page-utils";
import { IconContainer } from "../editor/new-page-button";
import AddQuestionDialog from "../editor/add-question-dialog";

/**
 * Add Question Container props
 */
interface AddQuestionContainerProps {
  borderWidth: number;
  width: number;
  height: number;
  gap: number;
}

/**
 * Styled add question container component
 */
const AddQuestionContainer = styled(Stack, {
  label: "add-question-container"
})<AddQuestionContainerProps>(({ borderWidth, width, height, gap }) => ({
  gap: gap,
  textAlign: "center",
  position: "absolute",
  bottom: "10%",
  right: "50%",
  transform: "translateX(50%)",
  backgroundColor: "#007f34",
  borderWidth: borderWidth,
  borderStyle: "dashed",
  borderColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: width,
  height: height
}));

/**
 * Component props
 */
interface Props {
  htmlString: string;
  width: number;
  height: number;
  scale: number;
  page?: Page;
  selectedPage?: number;
  previewPage?: boolean;
  setSelectedPage?: (pageNumber: number) => void;
  onPanelPropertiesChange?: () => void;
  deletePage?: (pageNumber: number) => Promise<void>;
  addQuestion?: (questionType: PageQuestionType, pageId: string) => Promise<void>;
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
  page,
  selectedPage,
  previewPage,
  setSelectedPage,
  onPanelPropertiesChange,
  deletePage,
  addQuestion
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);

  /**
   * Set up event listener to recieve post message from iframe
   */
  useEffect(() => {
    // TODO: In the future when we need more event handlers within the iframe we can use a switch statement to replace the handlePostMessageEventListener.
    // This can direct us to the appropriate event listener based upon the type of the Event e.g. IframeClickEvent, IframeButtonClickEvent etc.
    window.addEventListener(`message-${page?.orderNumber}`, handlePostMessageEventListener);

    return () =>
      window.removeEventListener(`message-${page?.orderNumber}`, handlePostMessageEventListener);
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
          sx={{ position: "absolute", top: 0, right: 0, padding: 0, margin: 0 }}
        >
          <MoreHoriz sx={{ width: `${30 / scale}px`, height: `${30 / scale}px`, color: "#fff" }} />
        </IconButton>
      )}
      <iframe
        srcDoc={wrapTemplate(parseHtmlToDom(htmlString).outerHTML, page?.orderNumber)}
        title="preview"
        width={width}
        height={height}
        seamless
        style={{ border: selectedPage === page?.orderNumber ? "20px solid #46dc78" : "none" }}
      />
      {!previewPage &&
        page?.orderNumber &&
        PageUtils.hasQuestionsPlaceholder(htmlString) &&
        !page?.question &&
        addQuestion && (
          <AddQuestionContainer
            gap={2 / scale}
            borderWidth={1 / scale}
            width={width * scale * 3}
            height={width * scale * 4.5}
            onClick={() => setAddQuestionDialogOpen(true)}
          >
            <IconContainer
              scale={scale}
              borderColor="#fff"
              onClick={() => setAddQuestionDialogOpen(true)}
            >
              <Add sx={{ width: 50 / scale, height: 50 / scale, color: "#fff" }} />
            </IconContainer>
            <Typography variant="h3" color="#fff">
              {strings.editSurveysScreen.addQuestion.helperText}
            </Typography>
            <AddQuestionDialog
              open={addQuestionDialogOpen}
              pageId={page?.id}
              onClose={() => setAddQuestionDialogOpen(false)}
              onAddQuestion={addQuestion}
            />
          </AddQuestionContainer>
        )}
      {!previewPage && deletePage && page?.orderNumber && (
        <Menu
          anchorEl={anchorEl}
          open={pageMenuOpen}
          onClose={() => setPageMenuOpen(!pageMenuOpen)}
        >
          <MenuItem onClick={() => deletePage(page?.orderNumber)}>
            {strings.editSurveysScreen.deletePage}
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Preview;
