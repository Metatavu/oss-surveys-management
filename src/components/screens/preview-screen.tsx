import { useEffect, useState } from "react";
import PreviewToolbar from "../layout-components/preview-toolbar";
import { Survey } from "../../generated/client";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import Preview from "../layout-components/preview";
import { Box, Toolbar, Typography, styled } from "@mui/material";
import titleAndTextTemplate from "../pages/templates/title-and-text";
import { DEVICE_HEIGHT, DEVICE_WIDTH, EDITOR_SCREEN_PREVIEW_CONTAINER_HEIGHT, EDITOR_SCREEN_PREVIEW_CONTAINER_WIDTH } from "../../constants";
import { useWindowSize } from "usehooks-ts";
import theme from "../../styles/theme";

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
  const htmlTemplateDummy = titleAndTextTemplate;


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
   * Render page count method
   *
   * TODO: implement the page count
   */
  const renderPageCount = () => (
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography color={ theme.palette.common.white }>1 / 1</Typography>
    </Toolbar>
  );

  return (
    <Root>
      <PreviewToolbar surveyName={ survey.title } />
      <PreviewArea>
        <PreviewContainer>
          <Preview
            htmlString={ htmlTemplateDummy }
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
