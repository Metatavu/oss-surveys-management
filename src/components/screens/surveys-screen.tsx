import { FormControl, Button, InputLabel, Select, Stack, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import strings from "../../localization/strings";

/**
 * Renders surveys screen
 */
const SurveysScreen = () => {

  /**
   * Creates a new survey
   */
  const createSurvey = () => {
    console.log("TODO");
    // API Call return id

    // Redirect to blank edit screen with id as part of route
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