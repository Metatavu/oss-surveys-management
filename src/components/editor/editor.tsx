import { Box, Stack, Typography, styled } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT,
  EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH,
  READY_TO_USE_LAYOUTS
} from "../../constants";
import { Layout, Page, PageQuestionType } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { EditorPanel, PanelProperties } from "../../types";
import LocalizationUtils from "../../utils/localization-utils";
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
import EditorPreview from "./editor-preview";
import ImageButton from "./image-button";
import NewPageButton from "./new-page-button";

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
  overflowY: "auto"
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
  const [selectedPage, setSelectedPage] = useState<Page>();
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
    const layouts = await layoutsApi.listLayouts({ maxResults: 1000 });
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
          layoutId: foundLayout.id,
          title: templateType,
          orderNumber: surveyPages.length + 1,
          nextButtonVisible: true,
          question: undefined,
          properties: foundLayout.layoutVariables?.map((variable) => {
            const serializedValue = PageUtils.getNewPageSerializedValues(foundLayout, variable);

            return {
              key: variable.key,
              value: serializedValue
            };
          })
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
   * @param pageId page id
   */
  const deletePage = async (pageId?: string) => {
    const foundPage = surveyPages.find((page) => page.id === pageId);

    if (!foundPage?.id) return;
    try {
      setIsLoading(true);
      await pagesApi.deleteSurveyPage({ surveyId: surveyId, pageId: foundPage.id });
      const newSurveyPages = surveyPages.filter((page) => page.id !== pageId);
      newSurveyPages.sort((a, b) => a.orderNumber - b.orderNumber);

      const updatedPages: Page[] = [];
      for (const page of newSurveyPages) {
        if (!page?.id) continue;
        if (page.orderNumber > foundPage.orderNumber) {
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
   * Adds a question to the page
   *
   * @param questionType question type
   * @param pageId page id
   */
  const addQuestion = async (questionType: PageQuestionType, pageId: string) => {
    setIsLoading(true);
    const foundPage = surveyPages.find((page) => page.id === pageId);

    if (!foundPage?.id) return;

    try {
      const updatedPage = await pagesApi.updateSurveyPage({
        surveyId: surveyId,
        pageId: foundPage.id,
        page: {
          ...foundPage,
          question: {
            type: questionType,
            options: [PageUtils.getDefaultQuestionOption(1), PageUtils.getDefaultQuestionOption(2)]
          }
        }
      });

      setSurveyPages(surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page)));
      toast.success(strings.editSurveysScreen.addQuestion.questionAdded);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.questionNotAdded}, ${error}`);
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
        title={LocalizationUtils.getTranslatedLayoutName(layout.name) ?? strings.generic.unnamed}
        image={getLayoutThumbnail(layout)}
        onClick={() => createPage(layout.name)}
        disabled={!READY_TO_USE_LAYOUTS.includes(layout.name)}
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
    if (!page.id) return;

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
      if (!foundProperty?.value) continue;
      htmlData = PageUtils.handlePagePropertiesRendering(templateDom, variable, foundProperty);
    }

    return (
      <PreviewContainer key={page.id}>
        <EditorPreview
          htmlString={htmlData || strings.errorHandling.editSurveysScreen.pageLayoutsNotFound}
          width={DEVICE_WIDTH}
          height={DEVICE_HEIGHT}
          scale={EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH / DEVICE_WIDTH}
          onPanelPropertiesChange={() =>
            setPanelProperties({ panelType: EditorPanel.PAGE, pageNumber: page.orderNumber })
          }
          setSelectedPage={() => setSelectedPage(surveyPages.find((p) => p.id === page.id))}
          selectedPage={selectedPage}
          page={page}
          deletePage={deletePage}
          addQuestion={addQuestion}
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
        setSelectedPage(undefined);
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
