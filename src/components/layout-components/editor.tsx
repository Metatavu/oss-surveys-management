import { Box, Stack, styled } from "@mui/material";
import theme from "../../styles/theme";
import NewPageButton from "./new-page-button";
import Preview from "./preview";
import { EditorPanelProperties, Question, QuestionOption, QuestionType } from "../../types";
import titleAndTextTemplate from "../pages/templates/title-and-text";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";
import { optionsAtom } from "../../atoms/question-options-temporary";
import { useAtom } from "jotai";
import questionRendererFactory from "../../question-renderer/question-renderer";
import titleAndQuestionTemplate from "../pages/templates/title-and-question";

/**
 * TODO: This can be replaced when available from generated files.
 */
interface SurveyPage {
  id: string;
  data: string;
  question?: {
    id: string;
    type: QuestionType;
    options: QuestionOption[];
  }
};

/**
 * Component properties
 */
interface Props {
  setPanelProperties: (properties: EditorPanelProperties) => void;
};

/**
 * Styled editor container component
 */
const EditorContainer = styled(Stack, {
  label: "editor-container"
})(() => ({
  position: "relative",
  padding: theme.spacing(4),
  display: "flex",
  flexWrap: "wrap",
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between"
}));

/**
 * Styled preview container component
 */
const PreviewContainer = styled(Box, {
  label: "preview-container"
})(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH,
  height: EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT,
  "&:hover": {
    borderStyle: "solid",
    color: theme.palette.primary.dark
  }
}));

/**
 * Renders editor component
 */
const Editor = ({ setPanelProperties }: Props) => {
  // TODO: Waiting backend, Editor can recieve survey as props from editSurveysScreen, this will contain HTML data and the question data, for now using atom.
  const [ selectedQuestionOptions, _setSelectedQuestionOptions ] = useAtom(optionsAtom);

  // TODO: This is just mock data for now until availble from backend.
  const survey = {
    pages: [
      {
        id: "1",
        data: titleAndQuestionTemplate,
        question: {
          id: "12321321",
          type: QuestionType.SINGLE,
          options: selectedQuestionOptions
        } as Question
      },
      {
        id: "2",
        data: titleAndTextTemplate
      },
      {
        id: "3",
        data: titleAndTextTemplate
      }
    ] as SurveyPage[]
  };

  /**
   * Render page preview
   *
   * @param page Survey page
   * @returns PreviewContainer and Preview
   */
  const renderPagePreview = (page: SurveyPage) => {
    const { question, data  } = page;
    let htmlData = data;

    if (question) {
      const questionRenderer = questionRendererFactory.getRenderer(question.type);
      const questionHtml = questionRenderer.render({ question });
      const questionElement = new DOMParser().parseFromString(questionHtml, "text/html");

      const templateDom = new DOMParser().parseFromString(data, "text/html");
      const questionPlaceholder = templateDom.querySelector("div[data-component='question']");

      if (!questionPlaceholder) {
        console.warn("Could not find question placeholder in template.");
      }
      else {
        console.info("Found placeholder", questionElement);
        questionPlaceholder?.replaceWith(questionElement.body);
        htmlData = templateDom.body.innerHTML;
      }
    }

    return (
      <PreviewContainer
        key={ page.id }
      >
        <Preview
          htmlString={ htmlData }
          width={ DEVICE_WIDTH }
          height={ DEVICE_HEIGHT }
          scale={ EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH / DEVICE_WIDTH }
          onPanelPropertiesChange={ () => setPanelProperties(EditorPanelProperties.PAGE) }
        />
      </PreviewContainer>
    )
  };

  return (
    <EditorContainer
      direction="row"
      gap={4}
      onClick={ () => setPanelProperties(EditorPanelProperties.SURVEY) }
    >
      { survey.pages.map(renderPagePreview) }
      <NewPageButton/>
    </EditorContainer>
  )
};

export default Editor;