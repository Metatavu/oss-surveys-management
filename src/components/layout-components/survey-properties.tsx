import { Box, FormControlLabel, FormGroup, InputAdornment, Switch, TextField, Typography } from "@mui/material"
import strings from "../../localization/strings"
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
  onSaveSurvey: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Survey Properties component
 */
const SurveyProperties = ({ survey, onSaveSurvey }: Props) => {

  const renderWithDebounceTextField = (
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    placeholder: string,
    endAdornment: boolean
  ) => (
    <WithDebounce
      name={ name }
      value={ value }
      onChange={ onChange }
      placeholder={ placeholder }
      component={ props =>
        <TextField
          { ...props }
          fullWidth
          InputProps={{
            endAdornment: (
              endAdornment &&
              <InputAdornment position="end">
                <Edit fontSize="small" color="primary" />
              </InputAdornment>
            )
          }}
        />
      }
    />
  );

  const renderWithDebounceNumberField = (
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: number,
    placeholder: string
  ) => (
    <WithDebounce
      name={ name }
      value={ value }
      onChange={ onChange }
      placeholder={ placeholder }
      component={ props =>
        <TextField
          { ...props }
          type="number"
          fullWidth
          placeholder={ strings.editSurveysScreen.editSurveyPanel.returnTimeout }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TimerOutlinedIcon htmlColor={ theme.palette.primary.main }/>
              </InputAdornment>
            )
          }}
        />
      }
    />
  );

  const onReadyToPublishChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSaveSurvey({
        target: {
          name: "status",
          value: SurveyStatus.Approved
        }
      } as ChangeEvent<HTMLInputElement>);
    } else {
      onSaveSurvey({
        target: {
          name: "status",
          value: SurveyStatus.Draft
        }
      } as ChangeEvent<HTMLInputElement>);
    }
  }

  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{strings.editSurveysScreen.editSurveyPanel.name}</Typography>
        {
          renderWithDebounceTextField(
            "title",
            onSaveSurvey,
            survey.title,
            strings.editSurveysScreen.editSurveyPanel.name,
            true
          )
        }
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{ strings.editSurveysScreen.editSurveyPanel.description }</Typography>
        {
          renderWithDebounceTextField(
            "description",
            onSaveSurvey,
            survey.description ? survey.description : "",
            strings.editSurveysScreen.editSurveyPanel.description,
            true
          )
        }
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{ strings.editSurveysScreen.editSurveyPanel.returnTimeout }</Typography>
        {
          renderWithDebounceNumberField(
            "timeout",
            onSaveSurvey,
            survey.timeout ? Number(survey.timeout) : 60,
            strings.editSurveysScreen.editSurveyPanel.returnTimeout
          )
        }
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <FormGroup>
          <FormControlLabel control={<Switch onChange={ onReadyToPublishChange } checked={ survey.status === SurveyStatus.Approved } />} label={ strings.editSurveysScreen.editSurveyPanel.readyForPublish } />
        </FormGroup>
      </Box>
    </>
  )
}

export default SurveyProperties;