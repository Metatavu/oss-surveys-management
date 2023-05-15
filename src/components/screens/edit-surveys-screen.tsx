import { useParams } from "react-router-dom";
import Toolbar from "../layout-components/toolbar";
import { ChangeEvent, useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { Survey } from "../../generated/client";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import strings from "../../localization/strings";
import Editor from "../layout-components/editor";
import { CircularProgress, Stack } from "@mui/material";
import PropertiesPanel from "../layout-components/properties-panel";
import SurveyProperties from "../layout-components/survey-properties";
import { EditorPanel, PanelProperties } from "../../types";
import PageProperties from "../layout-components/page-properties";

/**
 * Renders edit surveys screen
 */
const EditSurveysScreen = () => {
  const { id } = useParams();
  const { surveysApi } = useApi();
  const setError = useSetAtom(errorAtom);

  const [survey, setSurvey] = useState<Survey>();
  const [panelProperties, setPanelProperties] = useState<PanelProperties>({
    panelType: EditorPanel.SURVEY
  });
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Get Survey from route id
   */
  const getSurvey = async () => {
    if (!id) return;

    const survey = await surveysApi.findSurvey({ surveyId: id });
    setSurvey(survey);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getSurvey().catch((error) =>
      setError(`${strings.errorHandling.editSurveysScreen.surveyNotFound}, ${error}`)
    );
  }, [id]);

  if (!survey?.id || isLoading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  /**
   * Persist changes to survey properties
   *
   * @param event event
   */
  const onSaveSurvey = async ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    if (!survey.id) return;

    try {
      const editedSurvey = {
        ...survey,
        [name]: value
      };
      const updatedSurvey = await surveysApi.updateSurvey({
        surveyId: survey.id,
        survey: editedSurvey
      });
      setSurvey(updatedSurvey);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.surveyNotSaved}, ${error}`);
    }
  };

  return (
    <>
      <Toolbar surveyName={survey?.title || ""} surveyId={survey.id} />
      <Stack direction="row" flex={1}>
        <Editor setPanelProperties={setPanelProperties} surveyId={survey.id} />
        <PropertiesPanel>
          {panelProperties.panelType === EditorPanel.SURVEY ? (
            <SurveyProperties survey={survey} onSaveSurvey={onSaveSurvey} />
          ) : (
            panelProperties.pageNumber && (
              <PageProperties surveyId={survey.id} pageNumber={panelProperties.pageNumber} />
            )
          )}
        </PropertiesPanel>
      </Stack>
    </>
  );
};

export default EditSurveysScreen;
