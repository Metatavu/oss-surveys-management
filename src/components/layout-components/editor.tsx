import { Box, Stack, Typography, styled } from "@mui/material";
import theme from "../../styles/theme";
import NewPageButton from "./new-page-button";
import GenericDialog from "../generic/generic-dialog";
import { useState } from "react";
import ImageButton from "./image-button";
import QuestionLayoutImage from "../images/svg/layout-thumbnails/question";
import InfoLayoutImage from "../images/svg/layout-thumbnails/info";
import InfoImageLayoutImage from "../images/svg/layout-thumbnails/info-image";
import strings from "../../localization/strings";
import QuestionParagraphLayoutImage from "../images/svg/layout-thumbnails/question-paragraph";
import ImageParagraphLayoutImage from "../images/svg/layout-thumbnails/image-paragraph";
import ParagraphImageLayoutImage from "../images/svg/layout-thumbnails/paragraph-image";
import StatisticsLayoutImage from "../images/svg/layout-thumbnails/statistics";
import Preview from "./preview";
import { EditorPanelProperties } from "../../types";
import titleAndTextTemplate from "../pages/templates/title-and-text";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";

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
}));

/**
 * Styled preview container component
 */
const PreviewContainer = styled(Box, {
  label: "preview-container"
})(({ theme }) => ({
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH,
  height: EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT,
  cursor: "pointer",
  boxSizing: "content-box",
  transition: "border 0.2s ease-out",
  "&:hover": {
    borderColor: theme.palette.primary.dark
  },
  "&.selected": {
    borderColor: theme.palette.primary.light
  }
}));

/**
 * Renders editor component
 */
const Editor = ({ setPanelProperties }: Props) => {
  const [ showAddPage, setShowAddPage ] = useState(false);

  const renderAddNewPageDialog = () => (
    <GenericDialog
      maxWidth="lg"
      open={ showAddPage }
      onCancel={ () => setShowAddPage(false) }
      onClose={ () => setShowAddPage(false) }
      cancelButtonText="Peruuta"
      title="Lisää uusi sivu"
    >
      <Typography>{ strings.layouts.title }</Typography>
      <Stack direction="row" gap={2} pt={3}>
        <ImageButton
          title={ strings.layouts.question }
          image={ <QuestionLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.info }
          image={ <InfoLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.infoImage }
          image={ <InfoImageLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.questionInfo }
          image={ <QuestionParagraphLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.imageParagraph }
          image={ <ImageParagraphLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.paragraphImage }
          image={ <ParagraphImageLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          disabled
          title={ strings.layouts.statistics }
          image={ <StatisticsLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
      </Stack>
    </GenericDialog>
  );

  // TODO: Waiting backend, Editor can recieve survey as props from editSurveysScreen, this will contain HTML data

  const htmlTemplateDummy = titleAndTextTemplate;

  const survey = {
    pages: [
      {
        id: 1,
        data: htmlTemplateDummy
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
            onClick={ () => setPanelProperties(EditorPanelProperties.PAGE) }
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
      <NewPageButton onClick={ () => setShowAddPage(true) }/>
      { renderAddNewPageDialog() }
    </EditorContainer>
  )
};

export default Editor;