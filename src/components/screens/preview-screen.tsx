import { useEffect, useState } from "react";
import PreviewToolbar from "../layout-components/preview-toolbar";
import { Survey } from "../../generated/client";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";

/**
 * Renders preview screen
 */
const PreviewScreen = () => {
  const { id } = useParams();
  const { surveysApi } = useApi();
  const setError = useSetAtom(errorAtom);

  const [ survey, setSurvey ] = useState<Survey>();

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
    <>
      <PreviewToolbar surveyName={ survey.title } />
      {/* TODO: Preview using data passed from id of survey */}
      {/* TODO: the page count display */}
    </>
  )
};

export default PreviewScreen;