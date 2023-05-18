import { Stack, TextField, InputAdornment, Box, Button, Paper, styled } from "@mui/material";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { Search, AddCircle } from "@mui/icons-material";
import { Survey } from "../../generated/client";
import { useEffect, useState } from "react";

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
 * Components properties
 */
interface Props {
  surveys: Survey[];
  setFilteredSurveys: (surveys: Survey[]) => void;
  createSurvey: () => Promise<void>;
}

/**
 * Surveys Filters component
 */
const SurveysFilters = ({ surveys, setFilteredSurveys, createSurvey }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setFilteredSurveys(
      surveys.filter((survey) => survey.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  /**
   * Handler for search field change event
   *
   * @param event event
   */
  const handleSearchFieldChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(value);

  return (
    <FilterContainer>
      <Stack direction="row" gap={2} alignItems="center">
        <TextField
          sx={{ flex: 2 }}
          label={strings.surveysScreen.filters.filter}
          value={searchTerm}
          onChange={handleSearchFieldChange}
          size="small"
          placeholder={strings.surveysScreen.filters.findByName}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            )
          }}
        />
        <TextField
          sx={{ flex: 1 }}
          label={strings.surveysScreen.filters.show}
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
          label={strings.surveysScreen.filters.sortBy}
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
          label={strings.surveysScreen.filters.category}
          size="small"
          select
          disabled
        />
        <Box>
          <Button size="large" variant="contained" startIcon={<AddCircle />} onClick={createSurvey}>
            {strings.surveysScreen.createButton}
          </Button>
        </Box>
      </Stack>
    </FilterContainer>
  );
};

export default SurveysFilters;
