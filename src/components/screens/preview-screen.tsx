import { useEffect, useState } from "react";
import PreviewToolbar from "../layout-components/preview-toolbar";
import { Survey } from "../../generated/client";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import Preview from "../layout-components/preview";
import { Box, Stack, styled } from "@mui/material";
import titleAndTextTemplate from "../pages/templates/title-and-text";

/**
 * Styled preview container component
 */
const PreviewContainer = styled(Box, {
  label: "preview-screen-preview-container"
})(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "center",
  width: 280,
  height: 497,
  "&:hover": {
    borderStyle: "solid",
    color: theme.palette.primary.dark
  }
}));

/**
 * Renders preview screen
 */
const PreviewScreen = () => {
  const { id } = useParams();
  const { surveysApi } = useApi();
  const setError = useSetAtom(errorAtom);

  const [ survey, setSurvey ] = useState<Survey>();
  const htmlTemplateDummy = titleAndTextTemplate;


  /**
   * Get Survey from route id
   */
  const getSurvey = async () => {
    if (!id) return null;

    try {
      const survey = await surveysApi.findSurvey({ surveyId: id });
      setSurvey(survey);
    } catch (error: any) {
      setError(`${ strings.errorHandling.editSurveysScreen.surveyNotFound }, ${ error }`)
    }
  };

  useEffect(() => {
    getSurvey();
  },[id]);

  if (!survey) return null;

  return (
    <Stack>
      <PreviewToolbar surveyName={ survey.title } />
      <PreviewContainer>
        <Preview
          htmlString={ htmlTemplateDummy }
        />
      </PreviewContainer>
      {/* TODO: the page count display */}
    </Stack>
  )
};

export default PreviewScreen;