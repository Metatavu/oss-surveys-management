import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import strings from '../../localization/strings'
import { Survey } from '../../generated/client';
import { ChangeEvent } from 'react';
import WithDebounce from '../generic/with-debounce';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Edit } from '@mui/icons-material';

/**
 * Component props
 */
interface Props {
  survey: Survey;
  onSaveSurvey: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

/**
 * Renders Survey Properties component
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
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          multiline
          placeholder={ strings.editSurveysScreen.editSurveyPanel.description }
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
        <Typography>{ strings.editSurveysScreen.editSurveyPanel.returnTimeout }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          type="number"
          fullWidth
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