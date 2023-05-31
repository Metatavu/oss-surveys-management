import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT,
  EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH
} from "../../constants";
import { Page, Survey } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { parseHtmlToDom } from "../../utils/preview-utils";
import wrapTemplate from "../pages/templates/template-wrapper";
import Preview from "../preview/preview";
import PreviewToolbar from "../preview/preview-toolbar";
import { Box, CircularProgress, Stack, Toolbar, Typography, styled } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";

/**
 * Styled preview root component
 */
const Root = styled(Box, {
  label: "preview-screen-preview-root"
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: theme.palette.common.black
}));

/**
 * Styled preview container component
 */
const PreviewArea = styled(Box, {
  label: "preview-screen-preview-area-container"
})(() => ({
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "center",
  flex: 1,
  width: "100%"
}));

/**
 * Styled preview container component
 */
const PreviewContainer = styled(Box, {
  label: "preview-screen-preview-container"
})(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH,
  height: EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT
}));

/**
 * Renders preview screen
 */
const PreviewScreen = () => {
  const { id } = useParams();
  const { surveysApi, layoutsApi, pagesApi } = useApi();
  const setError = useSetAtom(errorAtom);
  const { height } = useWindowSize();
  const [survey, setSurvey] = useState<Survey>();
  const [surveyPages, setSurveyPages] = useAtom(pagesAtom);
  const [pageLayouts, setPageLayouts] = useAtom(layoutsAtom);
  // TODO: update current page when changing pages in full screen preview.
  const [currentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Get Survey from route id
   */
  const getSurvey = async () => {
    if (!id) return null;
    const survey = await surveysApi.findSurvey({ surveyId: id });
    setSurvey(survey);
  };

  /**
   * Get surveys pages
   */
  const getSurveyPages = async () => {
    if (!id) return null;
    const surveyPages = await pagesApi.listSurveyPages({ surveyId: id });
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
   * Make all requests to generate preview
   */
  const getPreview = async () => {
    await getSurvey().catch((error) =>
      setError(`${strings.errorHandling.previewScreen.surveyNotFound}, ${error}`)
    );
    await getSurveyPages().catch((error) =>
      setError(`${strings.errorHandling.previewScreen.surveyNotFound}, ${error}`)
    );
    await getPageLayouts().catch((error) =>
      setError(`${strings.errorHandling.previewScreen.pageLayoutsNotFound}, ${error}`)
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getPreview().catch((error) =>
      setError(`${strings.errorHandling.previewScreen.previewNotFound}, ${error}`)
    );
    setIsLoading(false);
  }, [id]);

  if (!survey || isLoading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (!surveyPages.length) {
    return (
      <Root>
        <PreviewToolbar surveyName={survey.title} />
        <PreviewArea style={{ color: theme.palette.error.main }}>
          {strings.errorHandling.previewScreen.surveyPagesNotFound}
        </PreviewArea>
      </Root>
    );
  }

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
   * Render page count method
   */
  const renderPageCount = () => (
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography color={theme.palette.common.white}>
        {currentPage} / {surveyPages.length}
      </Typography>
    </Toolbar>
  );

  return (
    <Root>
      <PreviewToolbar surveyName={survey.title} />
      <PreviewArea>
        <PreviewContainer>
          <Preview
            htmlString={wrapTemplate(
              parseHtmlToDom(getPageLayout(surveyPages[currentPage - 1])?.html ?? "").outerHTML
            )}
            width={DEVICE_WIDTH}
            height={DEVICE_HEIGHT}
            scale={height / 1.5 / DEVICE_HEIGHT}
          />
        </PreviewContainer>
      </PreviewArea>
      {renderPageCount()}
    </Root>
  );
};

export default PreviewScreen;
