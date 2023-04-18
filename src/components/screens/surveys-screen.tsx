import { FormControl, Button, InputLabel, Select, Stack, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import strings from "../../localization/strings";
import { useApi } from "../../hooks/use-api";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import { useNavigate } from "react-router-dom";

/**
 * Renders surveys screen
 */
const SurveysScreen = () => {
  const { surveysApi } = useApi();

  const setError = useSetAtom(errorAtom);
  const navigate = useNavigate();

  /**
   * Creates a new survey
   */
  const createSurvey = async () => {
    try {
      const newSurvey = await surveysApi.createSurvey({
        survey: {
          title: strings.surveysScreen.newSurvey
        }
      });

      navigate(`edit/${newSurvey.id}`)
    } catch (error: any) {
      setError(`${strings.errorHandling.surveysScreen.createSurveyError}, ${error}`)
    }

  }

  return (
    <Stack
      direction="row"
      gap={5}
      sx={{ backgroundColor: "white", padding: 1 }}
    >
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>{ strings.surveysScreen.show }</InputLabel>
        <Select sx={{ marginTop: 4 }} />
      </FormControl>
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>{ strings.surveysScreen.sortBy }</InputLabel>
        <Select sx={{ marginTop: 4 }} />
      </FormControl>
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>{ strings.surveysScreen.category }</InputLabel>
        <Select sx={{ marginTop: 4 }} />
      </FormControl>
      <FormControl size="small" sx={{ flex: 2 }}>
        <InputLabel>{ strings.surveysScreen.filter }</InputLabel>
        <TextField sx={{ marginTop: 4 }} />
      </FormControl>
      <Button
        variant="outlined"
        size="small"
        startIcon={ <AddCircleIcon /> }
        onClick={ createSurvey }
      >
        { strings.surveysScreen.createButton }
      </Button>
    </Stack>
  );
};

export default SurveysScreen;