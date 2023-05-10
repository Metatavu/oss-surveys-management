import { Box, Stack, Typography, styled } from "@mui/material";
import theme from "../../styles/theme";
import NewPageButton from "./new-page-button";
import GenericDialog from "../generic/generic-dialog";
import { useEffect, useState } from "react";
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
import { EditorPanelProperties, Question, QuestionOption, QuestionType } from "../../types";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";
import { useApi } from "../../hooks/use-api";
import { Page } from "../../generated/client";
import { errorAtom } from "../../atoms/error";
import { useAtom, useSetAtom } from "jotai";
import { v4 as uuid } from 'uuid';
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { optionsAtom } from "../../atoms/question-options-temporary";
import questionRendererFactory from "../../question-renderer/question-renderer";
import titleAndQuestionTemplate from "../pages/templates/title-and-question";
import titleAndTextTemplate from "../pages/templates/title-and-text";

/**
 * Component properties
 */
interface Props {
  setPanelProperties: (properties: EditorPanelProperties) => void;
  surveyId: string;
}

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
  }
}));

/**
 * Renders editor component
 *
 * @param props component properties
 */
const Editor = ({ setPanelProperties, surveyId }: Props) => {
  const [ selectedQuestionOptions, _setSelectedQuestionOptions ] = useAtom(optionsAtom);
  const [ showAddPage, setShowAddPage ] = useState(false);
  const setError = useSetAtom(errorAtom);
  const [ surveyPages, setSurveyPages ] = useAtom(pagesAtom);
  const [ pageLayouts, setPageLayouts ] = useAtom(layoutsAtom);
  const [ selectedPage, setSelectedPage ] = useState<number>();

  const { pagesApi, layoutsApi } = useApi();

  useEffect(() => {
    getPageLayouts()
      .catch(error =>
        setError(`${strings.errorHandling.editSurveysScreen.pageLayoutsNotFound}, ${error}`));

    getSurveyPages()
      .catch(error =>
        setError(`${strings.errorHandling.editSurveysScreen.surveyPagesNotFound}, ${error}`));
  },[]);

  /**
   * Get surveys pages
   */
  const getSurveyPages = async () => {
    const surveyPages = await pagesApi.listSurveyPages({surveyId: surveyId});
    setSurveyPages(surveyPages);
  };

  /**
   * Get layouts
   */
  const getPageLayouts = async () => {
    const layouts = await layoutsApi.listLayouts();
    setPageLayouts(layouts);
  }

  /**
   * Create a new page based on selected template
   *
   * @param templateType string
   */
  const createPage = async (templateType: string) => {
    const layouts = await layoutsApi.listLayouts();
    setPageLayouts(layouts);
    const layoutId = layouts.find(layout => layout.name === templateType.toLocaleLowerCase())?.id;

    if (!layoutId) return;

    const newPage = await pagesApi.createSurveyPage({
      surveyId: surveyId,
      page: {
        id: uuid(),
        layoutId: layoutId,
        title: templateType,
        orderNumber: surveyPages.length + 1
      }
    });

    setSurveyPages([...surveyPages, newPage]);
    setShowAddPage(false)
  };

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
          onClick={ () => createPage(strings.layouts.info) }
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

  /**
   * Get the page layout based on page layout id
   *
   * @param page Page
   * @returns layout html
   */
  const getPageLayout = (page: Page) => {
    return pageLayouts.find(layout => layout.id === page.layoutId)?.html;
  };

  // const htmlTemplateDummy = titleAndTextTemplate;

  // const survey = {
  //   pages: [
  //     {
  //       id: 1,
  //       data: htmlTemplateDummy
  //     },
  //     {
  //       id: 2,
  //       data: htmlTemplateDummy
  //     },
  //     {
  //       id: 3,
  //       data: htmlTemplateDummy
  //     }
  //   ] as Page[]
  // };

  return (
    <EditorContainer
      direction="row"
      gap={4}
      onClick={ () => setPanelProperties(EditorPanelProperties.SURVEY) }
    >
      { !!surveyPages.length && surveyPages.map(page =>
          <PreviewContainer
            key={ page.id }
          >
            <Preview
              htmlString={getPageLayout(page) || strings.errorHandling.editSurveysScreen.pageLayoutsNotFound}
              width={ DEVICE_WIDTH }
              height={ DEVICE_HEIGHT }
              scale={ EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH / DEVICE_WIDTH }
              onPanelPropertiesChange={ () => setPanelProperties(EditorPanelProperties.PAGE) }
              setSelectedPage={() => setSelectedPage(page.orderNumber) }
              selectedPage={selectedPage}
              pageNumber={page.orderNumber}
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