import { useParams } from "react-router-dom";
import Toolbar from "../layout-components/toolbar";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { Survey } from "../../generated/client";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import strings from "../../localization/strings";
import Editor from "../layout-components/editor";
import { Box, Stack, Typography } from "@mui/material";
import PropertiesPanel from "../layout-components/properties-panel";

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
  }

  useEffect(() => {
    getSurvey();
  },[id])

  if (!survey) return null;

  return (
    <>
      <Toolbar surveyName={ survey?.title || "" } />
      <Stack direction="row" flex={1}>
        <Editor/>
        <PropertiesPanel>
          <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
            <Typography>{strings.generic.notImplemented}</Typography>
          </Box>
        </PropertiesPanel>
      </Stack>
    </>
  )
}

export default EditSurveysScreen;