import {
  Stack,
  TextField,
  InputAdornment,
  Box,
  Button,
  Paper,
  styled,
  MenuItem
} from "@mui/material";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { Search, AddCircle } from "@mui/icons-material";
import { DeviceSurvey, Survey } from "../../generated/client";
import { useEffect, useState } from "react";
import { SurveyManagementStatus, SurveySortBy } from "../../types";
import LocalizationUtils from "../../utils/localization-utils";
import SurveyUtils from "../../utils/survey-utils";

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
  deviceSurveys: DeviceSurvey[];
  setFilteredSurveys: (surveys: Survey[]) => void;
  createSurvey: () => Promise<void>;
}

/**
 * Surveys Filters component
 */
const SurveysFilters = ({ surveys, deviceSurveys, setFilteredSurveys, createSurvey }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setFilteredSurveys(
      surveys.filter((survey) => survey.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  useEffect(() => {
    setFilteredSurveys(
      surveys.sort((a, b) => SurveyUtils.sortSurveysByManagementStatus(a, b, deviceSurveys))
    );
  }, [surveys]);

  /**
   * Handler for search field change event
   *
   * @param event event
   */
  const handleSearchFieldChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(value);

  /**
   * Handler for show filter change event
   *
   * @param event event
   */
  const handleShowFilterChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === "SHOW_ALL") {
      setFilteredSurveys(surveys);
    } else {
      setFilteredSurveys(
        surveys.filter(
          (survey) => SurveyUtils.getSurveyManagementStatus(survey, deviceSurveys) === value
        )
      );
    }
  };

  /**
   * Renders show options
   */
  const renderShowOptions = () =>
    Object.values(SurveyManagementStatus).map((status) => (
      <MenuItem key={status} value={status}>
        {LocalizationUtils.getLocalizedShowOptions(status as SurveyManagementStatus)}
      </MenuItem>
    ));

  /**
   * Renders sort options
   */
  const renderSortOptions = () =>
    Object.values(SurveySortBy).map((sortBy) => (
      <MenuItem key={sortBy} value={sortBy}>
        {LocalizationUtils.getLocalizedSortByOptions(sortBy)}
      </MenuItem>
    ));

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
          defaultValue={"SHOW_ALL"}
          onChange={handleShowFilterChange}
          color="primary"
          InputProps={{ color: "primary" }}
          SelectProps={{
            sx: {
              "& .MuiInputBase-input": {
                color: theme.palette.primary.main
              }
            }
          }}
        >
          <MenuItem value={"SHOW_ALL"}>{strings.surveysScreen.filters.showAll}</MenuItem>
          {renderShowOptions()}
        </TextField>
        <TextField
          sx={{ flex: 1 }}
          label={strings.surveysScreen.filters.sortBy}
          size="small"
          select
        >
          {renderSortOptions()}
        </TextField>
        <TextField
          sx={{ flex: 1 }}
          label={strings.surveysScreen.filters.category}
          size="small"
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
