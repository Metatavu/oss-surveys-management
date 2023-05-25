import {
  Box,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import strings from "../../localization/strings";
import { Survey, SurveyStatus } from "../../generated/client";
import { ChangeEvent } from "react";
import WithDebounce from "../generic/with-debounce";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Edit } from "@mui/icons-material";
import theme from "../../styles/theme";

/**
 * Component props
 */
interface Props {
  survey: Survey;
  onSaveSurvey: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

/**
 * Survey Properties component
 */
const SurveyProperties = ({ survey, onSaveSurvey }: Props) => {
  /**
   * Renders text field with debounce
   *
   * @param name name
   * @param onChange onChange event handler
   * @param value value
   * @param placeholder placeholder
   * @param endAdornment end adornment true/false
   * @returns debounced text field
   */
  const renderWithDebounceTextField = (
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>,
    value: string,
    placeholder: string,
    endAdornment: boolean
  ) => (
    <WithDebounce
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      component={(props) => (
        <TextField
          {...props}
          fullWidth
          InputProps={{
            endAdornment: endAdornment && (
              <InputAdornment position="end">
                <Edit fontSize="small" color="primary" />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );

  /**
   * Renders number field with debounce
   *
   * @param name name
   * @param onChange onChange event handler
   * @param value value
   * @param placeholder placeholder
   * @returns debounced number field
   */
  const renderWithDebounceNumberField = (
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>,
    value: number,
    placeholder: string,
    type: string,
    fullWidth: boolean
  ) => (
    <WithDebounce
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      fullWidth={fullWidth}
      component={(props) => (
        <TextField
          {...props}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TimerOutlinedIcon htmlColor={theme.palette.primary.main} />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );

  /**
   * Switch event handler
   *
   * @param param event target
   */
  const onReadyToPublishChange = async ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    await onSaveSurvey({
      target: {
        name: "status",
        value: checked ? SurveyStatus.Approved : SurveyStatus.Draft
      }
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{strings.editSurveysScreen.editSurveyPanel.name}</Typography>
        {renderWithDebounceTextField(
          "title",
          onSaveSurvey,
          survey.title,
          strings.editSurveysScreen.editSurveyPanel.name,
          true
        )}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.editSurveysScreen.editSurveyPanel.description}
        </Typography>
        {renderWithDebounceTextField(
          "description",
          onSaveSurvey,
          survey.description ? survey.description : "",
          strings.editSurveysScreen.editSurveyPanel.description,
          true
        )}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.editSurveysScreen.editSurveyPanel.returnTimeout}
        </Typography>
        {renderWithDebounceNumberField(
          "timeout",
          onSaveSurvey,
          survey.timeout ? Number(survey.timeout) : 60,
          strings.editSurveysScreen.editSurveyPanel.returnTimeout,
          "number",
          true
        )}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={onReadyToPublishChange}
                checked={survey.status === SurveyStatus.Approved}
              />
            }
            label={strings.editSurveysScreen.editSurveyPanel.readyForPublish}
          />
        </FormGroup>
      </Box>
    </>
  );
};

export default SurveyProperties;
