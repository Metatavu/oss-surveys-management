import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT,
  EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH
} from "../../constants";
import { Layout, Page, PagePropertyType } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import questionRendererFactory from "../../question-renderer/question-renderer-factory";
import theme from "../../styles/theme";
import { EditorPanel, PanelProperties, QuestionType } from "../../types";
import GenericDialog from "../generic/generic-dialog";
import ImageParagraphLayoutImage from "../images/svg/layout-thumbnails/image-paragraph";
import InfoLayoutImage from "../images/svg/layout-thumbnails/info";
import InfoImageLayoutImage from "../images/svg/layout-thumbnails/info-image";
import ParagraphImageLayoutImage from "../images/svg/layout-thumbnails/paragraph-image";
import QuestionLayoutImage from "../images/svg/layout-thumbnails/question";
import QuestionParagraphLayoutImage from "../images/svg/layout-thumbnails/question-paragraph";
import StatisticsLayoutImage from "../images/svg/layout-thumbnails/statistics";
import Preview from "../preview/preview";
import ImageButton from "./image-button";
import NewPageButton from "./new-page-button";
import { Box, CircularProgress, Stack, Typography, styled } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

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
  flexDirection: "row"
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
  const [showAddPage, setShowAddPage] = useState(false);
  const setError = useSetAtom(errorAtom);
  const [surveyPages, setSurveyPages] = useAtom(pagesAtom);
  const [pageLayouts, setPageLayouts] = useAtom(layoutsAtom);
  const [selectedPageNumber, setSelectedPageNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const { pagesApi, layoutsApi } = useApi();

  useEffect(() => {
    setIsLoading(true);

    getPageLayouts().catch((error) =>
      setError(`${strings.errorHandling.editSurveysScreen.pageLayoutsNotFound}, ${error}`)
    );

    getSurveyPages().catch((error) =>
      setError(`${strings.errorHandling.editSurveysScreen.surveyPagesNotFound}, ${error}`)
    );

    setIsLoading(false);
  }, []);

  /**
   * Get surveys pages
   */
  const getSurveyPages = async () => {
    const surveyPages = await pagesApi.listSurveyPages({ surveyId: surveyId });
    setSurveyPages(surveyPages);
  };

  /**
   * Get layouts
   */
  const getPageLayouts = async () => {
    const layouts = await layoutsApi.listLayouts();
    setPageLayouts(layouts);
  };

  if (isLoading || !surveyPages.length || !pageLayouts.length) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  /**
   * Create a new page based on selected template
   *
   * @param templateType string
   */
  const createPage = async (templateType: string) => {
    const layoutId = pageLayouts.find((layout) => layout.name === templateType)!.id!;

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
    setShowAddPage(false);
  };

  /**
   * Returns template thumbnail based on template type
   *
   * @param layout Layout
   * @returns Layout thumbnail
   */
  const getLayoutThumbnail = (layout: Layout) =>
    ({
      question: <QuestionLayoutImage />,
      info: <InfoLayoutImage />,
      image: <InfoImageLayoutImage />,
      "question + info": <QuestionParagraphLayoutImage />,
      "image + info": <ImageParagraphLayoutImage />,
      "info + image": <ParagraphImageLayoutImage />,
      statistics: <StatisticsLayoutImage />
    })[layout.name];

  /**
   * Renders page template preview
   *
   * @returns Template preview
   */
  const createLayoutButtons = () =>
    pageLayouts.map((layout) => (
      <ImageButton
        key={layout.id}
        title={layout.name}
        image={getLayoutThumbnail(layout)}
        onClick={() => createPage(layout.name)}
        selected={false}
      />
    ));

  const renderAddNewPageDialog = () => (
    <GenericDialog
      maxWidth="lg"
      open={showAddPage}
      onCancel={() => setShowAddPage(false)}
      onClose={() => setShowAddPage(false)}
      cancelButtonText={strings.generic.cancel}
      title={strings.editSurveysScreen.addNewPage}
    >
      <Typography>{strings.layouts.title}</Typography>
      <Stack direction="row" gap={2} pt={3}>
        {createLayoutButtons()}
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
    return pageLayouts.find((layout) => layout.id === page.layoutId)!.html;
  };

  // TODO: This will need to be done for the preview screen?
  /**
   * Render page preview
   *
   * @param page Survey page
   * @returns PreviewContainer and Preview
   */
  const renderPagePreview = (page: Page) => {
    const { properties } = page;
    let htmlData = getPageLayout(page);

    const optionsProperty = properties?.find(
      (property) => property.type === PagePropertyType.Options
    );
    if (optionsProperty) {
      const questionRenderer = questionRendererFactory.getRenderer(QuestionType.SINGLE);

      const questionHtml = questionRenderer.render(JSON.parse(optionsProperty.value));
      const questionElement = new DOMParser().parseFromString(questionHtml, "text/html");

      const templateDom = new DOMParser().parseFromString(htmlData, "text/html");
      const questionPlaceholder = templateDom.querySelector("div[data-component='question']");

      if (!questionPlaceholder) {
        console.warn("Could not find question placeholder in template.");
      } else {
        questionPlaceholder?.replaceWith(questionElement.body);
        htmlData = templateDom.body.innerHTML;
      }
    }

    return (
      <PreviewContainer key={page.id}>
        <Preview
          htmlString={htmlData || strings.errorHandling.editSurveysScreen.pageLayoutsNotFound}
          width={DEVICE_WIDTH}
          height={DEVICE_HEIGHT}
          scale={EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH / DEVICE_WIDTH}
          onPanelPropertiesChange={() =>
            setPanelProperties({ panelType: EditorPanel.PAGE, pageNumber: page.orderNumber })
          }
          setSelectedPage={() => setSelectedPageNumber(page.orderNumber)}
          selectedPage={selectedPageNumber}
          pageNumber={page.orderNumber}
        />
      </PreviewContainer>
    );
  };

  return (
    <EditorContainer
      direction="row"
      gap={2}
      onClick={() => {
        setPanelProperties({ panelType: EditorPanel.SURVEY });
        setSelectedPageNumber(undefined);
      }}
    >
      {!!surveyPages.length && surveyPages.map(renderPagePreview)}
      <NewPageButton onClick={() => setShowAddPage(true)} />
      {renderAddNewPageDialog()}
    </EditorContainer>
  );
};

export default Editor;
