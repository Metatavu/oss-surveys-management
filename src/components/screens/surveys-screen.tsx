import { Search } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, InputAdornment, Paper, Stack, TextField, styled } from "@mui/material";
import strings from "../../localization/strings";
import { useApi } from "../../hooks/use-api";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";
import { useNavigate } from "react-router-dom";
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
    <FilterContainer>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
      >
        <TextField
          disabled
          sx={{ flex: 2 }}
          label={ strings.surveysScreen.filter }
          size="small"
          placeholder="Hae nimellä"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Search/></InputAdornment>
          }}
        />
        <TextField
          sx={{ flex: 1 }}
          label={ strings.surveysScreen.show }
          size="small"
          select
          disabled
        >
          {/* //TODO: select options not yet implemented
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          */}
        </TextField>
        <TextField
          sx={{ flex: 1 }}
          label={ strings.surveysScreen.sortBy }
          size="small"
          select
          disabled
        >
          {/* //TODO: select options not yet implemented
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          */}
        </TextField>
        <TextField
          sx={{ flex: 1 }}
          label={ strings.surveysScreen.category }
          size="small"
          select
          disabled
        />
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