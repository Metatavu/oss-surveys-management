import { Box, Button, InputLabel, Select, Stack, TextField } from "@mui/material";

/**
 * Renders surveys screen
 */
const SurveysScreen = () => {

  /**
   * Creates a new survey
   */
  const createSurvey = () => {
    console.log("TODO");
  }

  return (
    <Stack direction="row" sx={{ backgroundColor: "white" }}>
      <Box>
        <InputLabel>Näyta</InputLabel>
        <Select />
      </Box>
      <Box>
        <InputLabel>Järjestä</InputLabel>
        <Select />
      </Box>
      <Box>
        <InputLabel>Kategoria</InputLabel>
        <Select />
      </Box>
      <Box>
        <InputLabel>Suodata</InputLabel>
        <Select />
      </Box>
      <Box>
        <InputLabel>Suodata</InputLabel>
        <TextField />
      </Box>
      <Button onClick={ createSurvey }>Luo uusi kysely</Button>
    </Stack>
  );
};

export default SurveysScreen;