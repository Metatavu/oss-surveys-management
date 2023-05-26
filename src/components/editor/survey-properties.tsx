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
import { ChangeEvent, FocusEvent } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Edit } from "@mui/icons-material";
import theme from "../../styles/theme";

/**
 * Component props
 */
interface Props {
  survey: Survey;
  onSaveSurvey: (event: FocusEvent<HTMLInputElement>) => Promise<void>;
}

/**
 * Survey Properties component
 */
const SurveyProperties = ({ survey, onSaveSurvey }: Props) => {
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
    } as FocusEvent<HTMLInputElement>);
  };

  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{strings.editSurveysScreen.editSurveyPanel.name}</Typography>
        <TextField
          fullWidth
          name="title"
          defaultValue={survey.title}
          placeholder={strings.editSurveysScreen.editSurveyPanel.name}
          onBlur={onSaveSurvey}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Edit fontSize="small" color="primary" />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.editSurveysScreen.editSurveyPanel.description}
        </Typography>
        <TextField
          fullWidth
          name="description"
          defaultValue={survey.description}
          placeholder={strings.editSurveysScreen.editSurveyPanel.description}
          onBlur={onSaveSurvey}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Edit fontSize="small" color="primary" />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.editSurveysScreen.editSurveyPanel.returnTimeout}
        </Typography>
        <TextField
          fullWidth
          name="timeout"
          defaultValue={survey.timeout}
          type="number"
          placeholder={strings.editSurveysScreen.editSurveyPanel.returnTimeout}
          onBlur={onSaveSurvey}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TimerOutlinedIcon htmlColor={theme.palette.primary.main} />
              </InputAdornment>
            )
          }}
        />
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
