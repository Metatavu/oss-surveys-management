import { useEffect, useState } from "react";
import PreviewToolbar from "../layout-components/preview-toolbar";
import { Page, Survey } from "../../generated/client";
import { useParams } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import Preview from "../layout-components/preview";
import { Box, Toolbar, Typography, styled } from "@mui/material";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";
import { useWindowSize } from "usehooks-ts";
import theme from "../../styles/theme";
import { pagesAtom } from "../../atoms/pages";
import { layoutsAtom } from "../../atoms/layouts";
import { parseHtmlToDom } from "../../utils/PreviewUtils";
import wrapTemplate from "../pages/templates/template-wrapper";

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
  const { surveysApi } = useApi();
  const setError = useSetAtom(errorAtom);
  const { height } = useWindowSize();
  const [ survey, setSurvey ] = useState<Survey>();
  const [ surveyPages, _setSurveyPages ] = useAtom(pagesAtom);
  const [ pageLayouts, _setPageLayouts ] = useAtom(layoutsAtom);
  // TODO: update current page when changing pages in full screen preview.
  const [ currentPage, _setCurrentPage ] = useState(1);

  /**
   * Get Survey from route id
   */
  const getSurvey = async () => {
    if (!id) return null;

    const survey = await surveysApi.findSurvey({ surveyId: id });
    setSurvey(survey);
  };

  useEffect(() => {
    getSurvey()
      .catch(error =>
        setError(`${ strings.errorHandling.editSurveysScreen.surveyNotFound }, ${ error }`));
  },[id]);

  if (!survey) return null;

  /**
   * Get the page layout based on page layout id
   *
   * @param page Page
   * @returns layout html
   */
  const getPageLayout = (page: Page) => {
    const layout = pageLayouts.find(layout => layout.id === page.layoutId);

    if (!layout) return;

    return layout.html;
  }

  const htmlString = getPageLayout(surveyPages[currentPage-1]);

  if (!htmlString) return setError(strings.errorHandling.editSurveysScreen.pageLayoutNotFound);

  /**
   * Render page count method
   */
  const renderPageCount = () => (
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography color={ theme.palette.common.white }> {currentPage} / {surveyPages.length}</Typography>
    </Toolbar>
  );

  return (
    <Root>
      <PreviewToolbar surveyName={ survey.title } />
      <PreviewArea>
        <PreviewContainer>
          <Preview
            htmlString={ wrapTemplate(parseHtmlToDom(htmlString).outerHTML) }
            width={ DEVICE_WIDTH }
            height={ DEVICE_HEIGHT }
            scale={ (height / 1.5) / DEVICE_HEIGHT }
          />
        </PreviewContainer>
      </PreviewArea>
      { renderPageCount() }
    </Root>
  )
};

export default PreviewScreen;
