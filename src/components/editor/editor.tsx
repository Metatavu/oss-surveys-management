import { toast } from "react-toastify";
import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT,
  EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH
} from "../../constants";
import { Layout, Page, PageQuestionType } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { EditorPanel, PanelProperties } from "../../types";
import PageUtils from "../../utils/page-utils";
import GenericDialog from "../generic/generic-dialog";
import LoaderWrapper from "../generic/loader-wrapper";
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
import { Box, Stack, Typography, styled } from "@mui/material";
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
    setSurveyPages([...surveyPages.sort((a, b) => a.orderNumber - b.orderNumber)]);
  };

  /**
   * Get layouts
   */
  const getPageLayouts = async () => {
    const layouts = await layoutsApi.listLayouts();
    setPageLayouts(layouts);
  };

  /**
   * Create a new page based on selected template
   *
   * @param templateType string
   */
  const createPage = async (templateType: string) => {
    const foundLayout = pageLayouts.find((layout) => layout.name === templateType);

    if (!foundLayout?.id) return;
    try {
      setShowAddPage(false);
      setIsLoading(true);
      const newPage = await pagesApi.createSurveyPage({
        surveyId: surveyId,
        page: {
          id: uuid(),
          layoutId: foundLayout.id,
          title: templateType,
          orderNumber: surveyPages.length + 1,
          nextButtonVisible: true,
          question: templateType.includes("question")
            ? {
                type: PageQuestionType.SingleSelect,
                options: [
                  PageUtils.getDefaultQuestionOption(1),
                  PageUtils.getDefaultQuestionOption(2)
                ]
              }
            : undefined
        }
      });

      setSurveyPages([...surveyPages, newPage]);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotCreated}, ${error}`);
    }

    setIsLoading(false);
  };

  /**
   * Deletes page by page number
   *
   * @param pageNumber page number
   */
  const deletePage = async (pageNumber: number) => {
    const foundPage = surveyPages.find((page) => page.orderNumber === pageNumber);

    if (!foundPage?.id) return;
    try {
      setIsLoading(true);
      await pagesApi.deleteSurveyPage({ surveyId: surveyId, pageId: foundPage.id });
      const newSurveyPages = surveyPages.filter((page) => page.orderNumber !== pageNumber);
      newSurveyPages.sort((a, b) => a.orderNumber - b.orderNumber);

      const updatedPages: Page[] = [];
      for (const page of newSurveyPages) {
        if (!page?.id) continue;
        if (page.orderNumber > pageNumber) {
          updatedPages.push(
            await pagesApi.updateSurveyPage({
              surveyId: surveyId,
              pageId: page.id,
              page: { ...page, orderNumber: page.orderNumber - 1 }
            })
          );
        } else {
          updatedPages.push(page);
        }
      }

      setSurveyPages(updatedPages);
      toast.success(strings.editSurveysScreen.editPagesPanel.pageSaved);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotDeleted}, ${error}`);
    }
    setIsLoading(false);
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
    const foundPageLayout = pageLayouts.find((layout) => layout.id === page.layoutId);
    if (!foundPageLayout) return;

    return foundPageLayout;
  };

  /**
   * Render page preview
   *
   * @param page Survey page
   * @returns PreviewContainer and Preview
   */
  const renderPagePreview = (page: Page) => {
    const { properties } = page;
    const nextButtonVisible = surveyPages.find(
      (surveyPage) => surveyPage.id === page.id
    )?.nextButtonVisible;
    const pageLayout = getPageLayout(page);

    if (!pageLayout) return;

    let htmlData = pageLayout.html;
    const layoutVariables = pageLayout.layoutVariables;
    const templateDom = new DOMParser().parseFromString(htmlData, "text/html");

    if (!nextButtonVisible) {
      const nextButton = templateDom.querySelector("button[data-component='next-button']");
      nextButton?.remove();
      htmlData = templateDom.body.innerHTML;
    }

    if (page.question) {
      htmlData = PageUtils.handlePageQuestionsRendering(templateDom, page.question);
    }

    for (const variable of layoutVariables ?? []) {
      const foundProperty = properties?.find((property) => property.key === variable.key);
      if (!foundProperty) continue;
      htmlData = PageUtils.handlePagePropertiesRendering(templateDom, variable, foundProperty);
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
          deletePage={deletePage}
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
      <LoaderWrapper loading={isLoading}>
        {!!surveyPages.length && surveyPages.map(renderPagePreview)}
        <NewPageButton onClick={() => setShowAddPage(true)} />
        {renderAddNewPageDialog()}
      </LoaderWrapper>
    </EditorContainer>
  );
};

export default Editor;
