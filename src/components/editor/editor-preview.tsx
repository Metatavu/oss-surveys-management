import { IconButton, Menu, MenuItem, Stack, Typography, styled } from "@mui/material";
import { Page, PageQuestionType } from "../../generated/client";
import { Add, MoreHoriz } from "@mui/icons-material";
import wrapTemplate from "../pages/templates/template-wrapper";
import { parseHtmlToDom } from "../../utils/preview-utils";
import PageUtils from "../../utils/page-utils";
import { useEffect, useState } from "react";
import { IconContainer } from "./new-page-button";
import strings from "../../localization/strings";
import AddQuestionDialog from "./add-question-dialog";
import { IframeClickEvent } from "../../types";

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
 * Components properties
 */
interface Props {
  htmlString: string;
  width: number;
  height: number;
  scale: number;
  page: Page;
  selectedPage?: Page;
  setSelectedPage: (pageId: string) => void;
  onPanelPropertiesChange: () => void;
  deletePage: (pageId?: string) => Promise<void>;
  addQuestion: (questionType: PageQuestionType, pageId: string) => Promise<void>;
}

/**
 * Editor preview component
 */
const EditorPreview = ({
  htmlString,
  width,
  height,
  scale,
  page,
  selectedPage,
  setSelectedPage,
  onPanelPropertiesChange,
  deletePage,
  addQuestion
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);

  if (!page.id) return null;

  /**
   * Set up event listener to recieve post message from iframe
   */
  useEffect(() => {
    // TODO: In the future when we need more event handlers within the iframe we can use a switch statement to replace the handlePostMessageEventListener.
    // This can direct us to the appropriate event listener based upon the type of the Event e.g. IframeClickEvent, IframeButtonClickEvent etc.
    window.addEventListener(`message-${page?.id}`, handlePostMessageEventListener);

    return () => window.removeEventListener(`message-${page?.id}`, handlePostMessageEventListener);
  }, []);

  /**
   * Handles post messsage event from iframe
   *
   * @param event message event
   */
  const handlePostMessageEventListener = (event: any) => {
    const typedEvent = event as IframeClickEvent;

    onPanelPropertiesChange();
    setSelectedPage(typedEvent.detail.pageId);
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
      <IconButton
        onClick={handlePageMenuClick}
        sx={{ position: "absolute", top: 0, right: 0, padding: 0, margin: 0 }}
      >
        <MoreHoriz sx={{ width: `${30 / scale}px`, height: `${30 / scale}px`, color: "#fff" }} />
      </IconButton>
      <iframe
        srcDoc={wrapTemplate(parseHtmlToDom(htmlString).outerHTML, page.id)}
        title="preview"
        width={width}
        height={height}
        seamless
        style={{ border: selectedPage?.id === page.id ? "20px solid #46dc78" : "none" }}
      />
      {PageUtils.hasQuestionsPlaceholder(htmlString) && !page.question && (
        <>
          <AddQuestionContainer
            gap={2 / scale}
            borderWidth={1 / scale}
            width={width * scale * 3}
            height={width * scale * 4.5}
            onClick={() => setAddQuestionDialogOpen(true)}
          >
            <IconContainer scale={scale} borderColor="#fff">
              <Add sx={{ width: 50 / scale, height: 50 / scale, color: "#fff" }} />
            </IconContainer>
            <Typography variant="h3" color="#fff">
              {strings.editSurveysScreen.addQuestion.helperText}
            </Typography>
          </AddQuestionContainer>
          <AddQuestionDialog
            open={addQuestionDialogOpen}
            pageId={page?.id}
            onClose={() => setAddQuestionDialogOpen(!addQuestionDialogOpen)}
            onAddQuestion={addQuestion}
          />
        </>
      )}
      <Menu anchorEl={anchorEl} open={pageMenuOpen} onClose={() => setPageMenuOpen(!pageMenuOpen)}>
        <MenuItem onClick={() => deletePage(page.id)}>
          {strings.editSurveysScreen.deletePage}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EditorPreview;
