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
import { EditorPanel, PanelProperties, QuestionType } from "../../types";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";
import { useApi } from "../../hooks/use-api";
import { Page } from "../../generated/client";
import { errorAtom } from "../../atoms/error";
import { useAtom, useSetAtom } from "jotai";
import { v4 as uuid } from 'uuid';
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { optionsAtom } from "../../atoms/question-options-temporary";
import questionRendererFactory, { QuestionRenderOptions } from "../../question-renderer/question-renderer";

/**
 * Component properties
 */
interface Props {
  setPanelProperties: (properties: PanelProperties) => void;
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
  // TODO: Not needed once the options are coming from back end rather than this 'mock' example
  const [ questionOptions, _setQuestionOptions ] = useAtom(optionsAtom);
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
        html: "property to be removed",
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
          onClick={ () => createPage(strings.layouts.question) }
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
    return pageLayouts.find(layout => layout.id === page.layoutId)!.html;
  };

  // TODO: This will need to be done for the preview screen?
  /**
   * Render page preview
   *
   * @param page Survey page
   * @returns PreviewContainer and Preview
   */
  const renderPagePreview = (page: Page) => {
    // TODO: Replace the tempQuestion with the options data from the page properties
    // const { _properties  } = page;
    let htmlData = getPageLayout(page);

    // TODO: This should be based on the page.properties, wherer the key and type is OPTIONS, for now this will default as a single QuestionType but should be changed in the spec.
    if (page.title === strings.layouts.question) {
      const questionRenderer = questionRendererFactory.getRenderer(QuestionType.SINGLE);
      // TODO: The question should come from the value of the stringified page properties OPTIONS array, this will not have an id or type, it will just be an array of strings (the optsion text)
      const tempQuestion: QuestionRenderOptions = {
        question: {
          id: "12341234",
          type: QuestionType.SINGLE,
          options: questionOptions
        }
      };

      const questionHtml = questionRenderer.render(tempQuestion);
      const questionElement = new DOMParser().parseFromString(questionHtml, "text/html");

      const templateDom = new DOMParser().parseFromString(htmlData, "text/html");
      const questionPlaceholder = templateDom.querySelector("div[data-component='question']");

      if (!questionPlaceholder) {
        console.warn("Could not find question placeholder in template.");
      }
      else {
        questionPlaceholder?.replaceWith(questionElement.body);
        htmlData = templateDom.body.innerHTML;
      }
    }

    return (
      <PreviewContainer
        key={ page.id }
      >
        <Preview
          htmlString={htmlData || strings.errorHandling.editSurveysScreen.pageLayoutsNotFound}
          width={ DEVICE_WIDTH }
          height={ DEVICE_HEIGHT }
          scale={ EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH / DEVICE_WIDTH }
          onPanelPropertiesChange={ () => setPanelProperties({panelType: EditorPanel.PAGE, pageNumber: page.orderNumber}) }
          setSelectedPage={() => setSelectedPage(page.orderNumber) }
          selectedPage={selectedPage}
          pageNumber={page.orderNumber}
        />
      </PreviewContainer>
    )
  };

  return (
    <EditorContainer
      direction="row"
      gap={4}
      onClick={ () => {
        setPanelProperties({panelType: EditorPanel.SURVEY})
        setSelectedPage(undefined);
      }}
    >
      { !!surveyPages.length && surveyPages.map(renderPagePreview) }
      <NewPageButton onClick={ () => setShowAddPage(true) }/>
      { renderAddNewPageDialog() }
    </EditorContainer>
  )
};

export default Editor;