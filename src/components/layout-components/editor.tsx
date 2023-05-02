import { Box, Stack, styled } from "@mui/material";
import theme from "../../styles/theme";
import NewPageButton from "./new-page-button";
import Preview from "./preview";
import { EditorPanelProperties } from "../../types";
import titleAndTextTemplate from "../pages/templates/title-and-text";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";
import titleAndQueryTemplate from "../pages/templates/query-template-EXAMPLE";
import { optionsAtom } from "../../atoms/temp-options";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { renderSingleQuestionOptionsAsHtml } from "../../utils/PreviewUtils";

/**
 * Component properties
 */
interface Props {
  setPanelProperties: (properties: EditorPanelProperties) => void;
}

/**
 * Styled editor container component
 */
const EditorContainer = styled(Stack, {
  label: "toolbar-container"
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
  const [ options, _setOptions ] = useAtom(optionsAtom);

  // TODO: This needs to be done per page/ for each template containing options/ questions?
  const [ questionTemplate, setQuestionTemplate ] = useState(titleAndQueryTemplate());

  /**
   * Updates "static" template containing questions
   */
  useEffect(() => {
    setQuestionTemplate(titleAndQueryTemplate(renderSingleQuestionOptionsAsHtml(options)));
  }, [options]);

  const htmlTemplateDummy = titleAndTextTemplate;

  const survey = {
    pages: [
      {
        id: 1,
        data: questionTemplate
      },
      {
        id: 2,
        data: htmlTemplateDummy
      },
      {
        id: 3,
        data: htmlTemplateDummy
      }
    ]
  };

  return (
    <EditorContainer
      direction="row"
      gap={4}
      onDoubleClick={ () => setPanelProperties(EditorPanelProperties.SURVEY) }
    >
      {
        survey.pages.map(page =>
          <PreviewContainer
            key={ page.id }
          >
            <Preview
              htmlString={ page.data }
              width={ DEVICE_WIDTH }
              height={ DEVICE_HEIGHT }
              scale={ EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH / DEVICE_WIDTH }
              onPanelPropertiesChange={ () => setPanelProperties(EditorPanelProperties.PAGE) }
            />
          </PreviewContainer>
        )
      }
      <NewPageButton/>
    </EditorContainer>
  )
};

export default Editor;