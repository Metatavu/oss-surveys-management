import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import strings from '../../localization/strings'
import { Survey } from '../../generated/client';
import { ChangeEvent } from 'react';
import WithDebounce from '../generic/with-debounce';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

/**
 * Component props
 */
interface Props {
  survey: Survey;
  onSaveSurvey: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders Survey Properties component
 */
const SurveyProperties = ({ survey, onSaveSurvey }: Props) => {

  const renderWithDebounceTextField = (
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    placeholder: string
  ) => (
    <WithDebounce
      name={ name }
      value={ value }
      onChange={ onChange }
      placeholder={ placeholder }
      component={ props =>
        <TextField
          { ...props }/>
      }
    />
  );

  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{strings.editSurveysScreen.editSurveyPanel.name}</Typography>
        {
          renderWithDebounceTextField(
            "title",
            onSaveSurvey,
            survey.title,
            strings.editSurveysScreen.editSurveyPanel.name

          )
        }
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{ strings.editSurveysScreen.editSurveyPanel.description }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          placeholder={ strings.editSurveysScreen.editSurveyPanel.description }
        />
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{ strings.editSurveysScreen.editSurveyPanel.category }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          placeholder={ strings.editSurveysScreen.editSurveyPanel.category }
        />
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{ strings.editSurveysScreen.editSurveyPanel.returnTimeout }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          type="number"
          placeholder={ strings.editSurveysScreen.editSurveyPanel.returnTimeout }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TimerOutlinedIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>
    </>
  )
}

export default SurveyProperties;