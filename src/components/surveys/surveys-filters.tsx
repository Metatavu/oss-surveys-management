import {
  Stack,
  TextField,
  InputAdornment,
  Box,
  Button,
  Paper,
  styled,
  Tooltip
} from "@mui/material";
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

  useEffect(() => {
    setFilteredSurveys(
      surveys.sort(
        (a, b) =>
          (b.metadata?.modifiedAt?.valueOf() ?? 0) - (a.metadata?.modifiedAt?.valueOf() ?? 0)
      )
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
   * Renders disabled text field with "not yet implemented" tooltip
   * Filtering features are probably not implemented during MVP phase and therefore they'll be left as placeholders.
   *
   * @param label label
   */
  const renderDisabledTextField = (label: string) => (
    <Tooltip title={strings.generic.notImplemented} placement="top">
      <TextField
        sx={{ flex: 1 }}
        label={label}
        size="small"
        disabled
        select
        InputLabelProps={{
          sx: {
            "&.MuiInputLabel-root": {
              color: theme.palette.primary.main
            }
          }
        }}
        SelectProps={{
          sx: {
            "& .MuiInputBase-input": {
              color: theme.palette.primary.main
            }
          }
        }}
      />
    </Tooltip>
  );

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
        {renderDisabledTextField(strings.surveysScreen.filters.show)}
        {renderDisabledTextField(strings.surveysScreen.filters.sortBy)}
        {renderDisabledTextField(strings.surveysScreen.filters.category)}
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
