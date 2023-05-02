import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import strings from "../../localization/strings";
import { Edit } from "@mui/icons-material";
import { Question, QuestionType } from "../../types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from 'uuid';
import { optionsAtom } from "../../atoms/temp-options";
import { useAtom } from "jotai";

/**
 * Renders page properties component
 */
const PageProperties = () => {
  // TODO: Populated with options from the backend and debounce, to replace below atom
  // const [ questionOptions, setQuestionOptions ] = useState<Question[]>();

  //TODO:  Using atom to pass to the preview, this can later be done via backend and correct survey/ option/ page type.
  const [ questionOptions, setQuestionOptions ] =  useAtom(optionsAtom);

  /**
   * Handle question option change
   */
  const handleQuestionOptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    if (!questionOptions) return;

    const updatedOptions = questionOptions.map(option => {
      if (option.id === id) {
        return { ...option, data: event.target.value }
      }
      return option;
    });

    // TODO: Debounce with backend
    setQuestionOptions(updatedOptions);
  };

  const newQuestionOption = {
    id: uuid(),
    data: "",
    // TODO: this should handle multiple type later on also.
    type: QuestionType.SINGLE
  }

  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>
          {strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `(${1})`)}
        </Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          multiline
          placeholder={
            strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `(${1})`) as string
          }
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
        <Typography>{strings.editSurveysScreen.editPagesPanel.title}</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          multiline
          placeholder={strings.editSurveysScreen.editPagesPanel.title}
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
        <Typography>{ strings.editSurveysScreen.editPagesPanel.question }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          label={ strings.editSurveysScreen.editPagesPanel.question }
          size="small"
          select
          // TODO: this should handle Multiple question types later
          defaultValue={ QuestionType.SINGLE }
        >
          <MenuItem
            key={ QuestionType.SINGLE}
            value={ QuestionType.SINGLE }
          >
            { QuestionType.SINGLE }
          </MenuItem>
          {/* <MenuItem key={ QuestionType.MULTIPLE } value={ QuestionType.MULTIPLE }>
            { QuestionType.MULTIPLE }
          </MenuItem> */}
        </TextField>
      </Box>
      { questionOptions &&
        <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
          { questionOptions?.map(option =>
            <TextField
              key={option.id}
              fullWidth
              multiline
              value={ option.data }
              name={ option.data }
              onChange={ (e) => handleQuestionOptionChange(e, option.id) }
              placeholder={strings.editSurveysScreen.editPagesPanel.title}
              InputProps={{
                endAdornment: (
                  // TODO: Does this need delete functionality?
                  <InputAdornment position="end">
                    <Edit fontSize="small" color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
        </Box>
      }
      <Box>
        <Button
          size="large"
          variant="contained"
          startIcon={ <AddCircleIcon /> }
          onClick={ () => questionOptions ? setQuestionOptions([...questionOptions, newQuestionOption ]) : setQuestionOptions([newQuestionOption]) }
        >
          { strings.editSurveysScreen.editPagesPanel.addOption }
        </Button>
      </Box>
    </>
  );
};

export default PageProperties;