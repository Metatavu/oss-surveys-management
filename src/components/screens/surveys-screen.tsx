import { Search } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, InputAdornment, Paper, Stack, TextField, styled } from "@mui/material";
import strings from "../../localization/strings";
import theme from "../../styles/theme";

/**
 * Styled filter container component
 */
const FilterContainer = styled(Paper, {
  label: "filter-container"
})(() => ({
  position: "relative",
  zIndex: 1100,
  borderTop: "1px solid #DADCDE",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4)
}));

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
    <FilterContainer>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
      >
        <TextField sx={{ flex: 2 }} label={ strings.surveysScreen.filter } size="small" placeholder="Hae nimellä" InputProps={{ endAdornment: <InputAdornment position="end"><Search/></InputAdornment> }}/>
        <TextField sx={{ flex: 1 }} label={ strings.surveysScreen.show } size="small" select defaultValue="Kaikki">
          {/* //TODO: select options
          
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

          */}
        </TextField>
        <TextField sx={{ flex: 1 }} label={ strings.surveysScreen.sortBy } size="small" select defaultValue="Kaikki">
          {/* //TODO: select options
          
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

          */}
        </TextField>
        <TextField sx={{ flex: 1 }} label={ strings.surveysScreen.category } size="small" select defaultValue="Ei kategorioita" disabled/>
        <Box>
          <Button
            size="large"
            variant="contained"
            startIcon={ <AddCircleIcon /> }
            onClick={ createSurvey }
          >
            { strings.surveysScreen.createButton }
          </Button>
        </Box>
      </Stack>
    </FilterContainer>
  );
};

export default SurveysScreen;