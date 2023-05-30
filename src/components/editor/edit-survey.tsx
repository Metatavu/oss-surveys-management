import { errorAtom } from "../../atoms/error";
import { Survey } from "../../generated/client";
import strings from "../../localization/strings";
import { EditorPanel, PanelProperties } from "../../types";
import Editor from "./editor";
import PageProperties from "./page-properties";
import PropertiesPanel from "./properties-panel";
import SurveyProperties from "./survey-properties";
import { Stack, styled } from "@mui/material";
import { useSetAtom } from "jotai";
import { FocusEvent, useState } from "react";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  saveSurvey: (surveyId: string, survey: Survey) => Promise<void>;
}

/**
 * Editor root component props
 */
interface RootProps {
  height: number;
}

/**
 * Styled image button
 */
const Root = styled(Stack, {
  label: "editor-root"
})<RootProps>(({ height }) => ({
  maxHeight: height,
  flexDirection: "row"
}));

/**
 * Edit surevey component
 */
const EditSurvey = ({ survey, saveSurvey }: Props) => {
  const setError = useSetAtom(errorAtom);
  const getWindowHeight = window.innerHeight;
  const availableWindowHeight = getWindowHeight - 118;
  const [panelProperties, setPanelProperties] = useState<PanelProperties>({
    panelType: EditorPanel.SURVEY
  });

  /**
   * Persist changes to survey properties
   *
   * @param event event
   */
  const onSaveSurvey = async ({ target: { value, name } }: FocusEvent<HTMLInputElement>) => {
    if (!survey.id || survey[name as keyof typeof survey] === value) return;

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
    <Root height={availableWindowHeight}>
      {renderEditor()}
      <PropertiesPanel>{renderPropertiesPanel()}</PropertiesPanel>
    </Root>
  );
};

export default EditSurvey;
