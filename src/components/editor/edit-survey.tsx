import { errorAtom } from "../../atoms/error";
import { Survey } from "../../generated/client";
import strings from "../../localization/strings";
import { EditorPanel, PanelProperties } from "../../types";
import Editor from "./editor";
import PageProperties from "./page-properties";
import PropertiesPanel from "./properties-panel";
import SurveyProperties from "./survey-properties";
import { Stack } from "@mui/material";
import { useSetAtom } from "jotai";
import { ChangeEvent, useState } from "react";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  saveSurvey: (surveyId: string, survey: Survey) => Promise<void>;
}
/**
 * Edit surevey component
 */
const EditSurvey = ({ survey, saveSurvey }: Props) => {
  const setError = useSetAtom(errorAtom);

  const [panelProperties, setPanelProperties] = useState<PanelProperties>({
    panelType: EditorPanel.SURVEY
  });

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
      await saveSurvey(survey.id, editedSurvey);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.surveyNotSaved}, ${error}`);
    }
  };

  /**
   * Renders editor
   */
  const renderEditor = () => {
    if (!survey?.id) return;

    return <Editor setPanelProperties={setPanelProperties} surveyId={survey.id} />;
  };

  /**
   * Renders properties panel
   */
  const renderPropertiesPanel = () => {
    if (!survey?.id) return;
    return panelProperties.panelType === EditorPanel.SURVEY ? (
      <SurveyProperties survey={survey} onSaveSurvey={onSaveSurvey} />
    ) : (
      panelProperties.pageNumber && (
        <PageProperties surveyId={survey.id} pageNumber={panelProperties.pageNumber} />
      )
    );
  };

  return (
    <Stack direction="row" flex={1}>
      {renderEditor()}
      <PropertiesPanel>{renderPropertiesPanel()}</PropertiesPanel>
    </Stack>
  );
};

export default EditSurvey;