import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import strings from "../../localization/strings";
import { Edit } from "@mui/icons-material";
import { QuestionOption, QuestionType } from "../../types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from 'uuid';
import { optionsAtom } from "../../atoms/question-options-temporary";
import { useAtom } from "jotai";
import GenericDialog from "../generic/generic-dialog";

/**
 * Renders page properties component
 */
const PageProperties = () => {
  // TODO: Populated with options from the backend and debounce, to replace below atom
  // const [ questionOptions, setQuestionOptions ] = useState<Question[]>();

  //TODO:  Using atom to pass to the preview, this can later be done via backend and be associated with the correct survey/ page/ question type.
  const [ questionOptions, setQuestionOptions ] =  useAtom(optionsAtom);
  const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);
  const [ optionToDelete, setOptionToDelete] = useState<QuestionOption | undefined>();

  /**
   * Handle question option change
   */
  const handleQuestionOptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    if (!questionOptions) return;

    const updatedOptions = questionOptions.map(option => {
      if (option.id === id) {
        return { ...option, text: event.target.value }
      }
      return option;
    });

    // TODO: Debounce with backend
    setQuestionOptions(updatedOptions);
  };

  /**
   * Adds new question option to question options
   */
  const addNewQuestionOption = () => {
    const newQuestionOption: QuestionOption = {
      id: uuid(),
      text: "",
    };

    questionOptions
    ? setQuestionOptions([ ...questionOptions, newQuestionOption ])
    : setQuestionOptions([ newQuestionOption ]);
  };

  /**
   * Removes the selected option from the list
   */
  const deleteOption = () => {
    if (!optionToDelete) return;

    const updatedList = questionOptions.filter(option => option.id !== optionToDelete.id);

    setQuestionOptions(updatedList);
    setDeleteDialogOpen(false);
  };

  /**
   * Trigger delete confirm dialog and store option to be deleted state
   */
  const handleDeleteClick = (optionId: QuestionOption) => {
    setDeleteDialogOpen(true);
    setOptionToDelete(optionId);
  };

  return (
    <>
      <GenericDialog
        title={ strings.editSurveysScreen.editPagesPanel.confirmDeleteOption }
        open={ deleteDialogOpen }
        onCancel={ () => setDeleteDialogOpen(false) }
        onClose={ () => setDeleteDialogOpen(false) }
        onConfirm={ deleteOption }
        children={ <div>{ optionToDelete?.text }</div> }
        confirmButtonText={ strings.generic.confirm }
      />
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
        <Typography>{ strings.editSurveysScreen.editPagesPanel.title }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          multiline
          placeholder={ strings.editSurveysScreen.editPagesPanel.title }
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
              key={ option.id }
              fullWidth
              multiline
              value={ option.text }
              name={ option.text }
              onChange={ (e) => handleQuestionOptionChange(e, option.id) }
              placeholder={ strings.editSurveysScreen.editPagesPanel.title }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Edit
                      fontSize="small"
                      color="primary"
                    />
                    <DeleteIcon
                      fontSize="small"
                      color="error"
                      onClick={ () => handleDeleteClick(option) }
                    />
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
          onClick={ addNewQuestionOption }
        >
          { strings.editSurveysScreen.editPagesPanel.addOption }
        </Button>
      </Box>
    </>
  );
};

export default PageProperties;