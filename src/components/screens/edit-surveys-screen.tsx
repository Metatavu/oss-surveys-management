import { useParams } from "react-router-dom";
import Toolbar from "../layout-components/toolbar";
import { ChangeEvent, useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { Survey } from "../../generated/client";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import strings from "../../localization/strings";
import Editor from "../layout-components/editor";
import { Stack } from "@mui/material";
import PropertiesPanel from "../layout-components/properties-panel";
import SurveyProperties from "../layout-components/survey-properties";

/**
 * Renders edit surveys screen
 */
const EditSurveysScreen = () => {
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

  /**
   * Persist changes to survey properties
   *
   * event event
   */
  const onSaveSurvey = async ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    if(!survey.id) return;

    try {
      const editedSurvey = {
        ...survey,
        [name]: value
      };
      const updatedSurvey = await surveysApi.updateSurvey({ surveyId: survey.id, survey: editedSurvey });
      setSurvey(updatedSurvey);
    } catch (error: any) {
      setError(`${ strings.errorHandling.editSurveysScreen.surveyNotSaved }, ${ error }`)
    }
  };

  return (
    <>
      <Toolbar surveyName={ survey?.title || "" } />
      <Stack direction="row" flex={1}>
        <Editor/>
        <PropertiesPanel>
          <SurveyProperties
            survey={ survey }
            onSaveSurvey={ onSaveSurvey }
          />
        </PropertiesPanel>
      </Stack>
    </>
  )
}

export default EditSurveysScreen;