import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import strings from "../../localization/strings";
import { Edit } from "@mui/icons-material";
import { QuestionOption, QuestionType, Templates } from "../../types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { optionsAtom } from "../../atoms/question-options-temporary";
import { useAtom } from "jotai";
import GenericDialog from "../generic/generic-dialog";
import { pagesAtom } from "../../atoms/pages";
import { useApi } from "../../hooks/use-api";
import { Page, PagePropertyType } from "../../generated/client";
import { layoutsAtom } from "../../atoms/layouts";

/**
 * Component properties
 */
interface Props {
  pageNumber: number;
  surveyId: string;
}

/**
 * Renders page properties component
 */
const PageProperties = ({ pageNumber, surveyId }: Props) => {
  //TODO: Using atom to pass to the preview, this can later be done via backend and be associated with the correct survey/ page/ question type. Can then delete this atom
  const [questionOptions, setQuestionOptions] = useAtom(optionsAtom);
  const [options, setOptions] = useState<string[]>([]);

  const [surveyPages] = useAtom(pagesAtom);
  const [ pageLayouts ] = useAtom(layoutsAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState<QuestionOption | undefined>();
  const { pagesApi } = useApi();

  /**
   * Set the question options state if contained within the page properties
   */
  const getQuestionOptions = () => {
    const optionsArrayString = surveyPages[pageNumber - 1].properties?.find(
      (property) => property.key === PagePropertyType.Options
    )?.value;

    if (!optionsArrayString) return;
    setOptions(JSON.parse(optionsArrayString));
  };

  useEffect(() => {
    getQuestionOptions();
  }, []);

  /**
   * Handle question option change
   *
   * @param event Event
   * @param id string
   */
  const handleQuestionOptionChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    // TODO: Demo Using the local atom state, to be removed when connected to backend
    if (!questionOptions) return;

    const updatedOptions = questionOptions.map((option) => {
      if (option.id === id) {
        return { ...option, text: event.target.value };
      }
      return option;
    });

    setQuestionOptions(updatedOptions);


    // Persisting across the backend

    // let updatedOptions: string;
    // if (options.length) {
    // updatedOptions = JSON.stringify([...options, event.target.value]);
    // } else {
    // updatedOptions = JSON.stringify([ event.target.value ]);
    // }

    // TODO: need an updatedProperties object updating the object with key OPTIONS

    // const updatedPage: Page = {
    // ...surveyPages[pageNumber-1],
    // properties: {
    // ...surveyPages[pageNumber-1].properties,
    // [PagePropertyType.Options]: updatedOptions
    // }
    // };

    // console.log("Add to existing options", updatedPage);

    // await pagesApi.updateSurveyPage({
    // pageId: surveyPages[pageNumber].id!,
    // surveyId: surveyId,
    // page: surveyPages[0]
    // });
    // }

    // const updatedPage: Page = {
    // ...surveyPages[pageNumber-1],
    // properties
    // };

    // await pagesApi.updateSurveyPage({
    // pageId: surveyPages[pageNumber].id!,
    // surveyId: surveyId,
    // page: surveyPages[0]
    // });
    // TODO: Debounce with backend, this state is not needed when its working?
    // setQuestionOptions(updatedOptions);
  };

  /**
   * Adds new question option to question options
   */
  const addNewQuestionOption = () => {
    const newQuestionOption: QuestionOption = {
      id: uuid(),
      text: ""
    };

    questionOptions
      ? setQuestionOptions([...questionOptions, newQuestionOption])
      : setQuestionOptions([newQuestionOption]);
  };

  /**
   * Removes the selected option from the list
   */
  const deleteOption = () => {
    if (!optionToDelete) return;

    const updatedList = questionOptions.filter((option) => option.id !== optionToDelete.id);

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
        title={strings.editSurveysScreen.editPagesPanel.confirmDeleteOption}
        open={deleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={deleteOption}
        children={<div>{optionToDelete?.text}</div>}
        confirmButtonText={strings.generic.confirm}
      />
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>
          {strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `(${pageNumber})`)}
        </Typography>
        {/* TODO: Update with Debounce when backend ready */}
        {/* TODO: CHeck should this be able to be overridden? IF so then need to change the logic for rendering the question options in this panel. */}
        <TextField
          fullWidth
          multiline
          placeholder={
            strings.formatString(
              strings.editSurveysScreen.editPagesPanel.page,
              `(${pageNumber})`
            ) as string
          }
          value={surveyPages[pageNumber - 1].title}
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
      {!!pageLayouts.find(layout => layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === Templates.QUESTION) && (
        <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
          <Typography>{strings.editSurveysScreen.editPagesPanel.question}</Typography>
          {/* TODO: Update with Debounce when backend ready */}
          <TextField
            fullWidth
            label={strings.editSurveysScreen.editPagesPanel.question}
            size="small"
            select
            // TODO: this should handle Multiple question types later
            defaultValue={QuestionType.SINGLE}
          >
            <MenuItem key={QuestionType.SINGLE} value={QuestionType.SINGLE}>
              {QuestionType.SINGLE}
            </MenuItem>
            {/* <MenuItem key={ QuestionType.MULTIPLE } value={ QuestionType.MULTIPLE }>
{ QuestionType.MULTIPLE }
</MenuItem> */}
          </TextField>
        </Box>
      )}
      {!!pageLayouts.find(layout => layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === Templates.QUESTION) &&
        !!questionOptions.length && (
          <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
            {questionOptions?.map((option) => (
              <TextField
                key={option.id}
                fullWidth
                multiline
                value={option.text}
                name={option.text}
                onChange={(e) => handleQuestionOptionChange(e, option.id)}
                placeholder={strings.editSurveysScreen.editPagesPanel.title}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Edit fontSize="small" color="primary" />
                      <DeleteIcon
                        fontSize="small"
                        color="error"
                        onClick={() => handleDeleteClick(option)}
                      />
                    </InputAdornment>
                  )
                }}
              />
            ))}
          </Box>
        )}
      {!!pageLayouts.find(layout => layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === Templates.QUESTION) && (
        <Box>
          <Button
            size="large"
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={addNewQuestionOption}
          >
            {strings.editSurveysScreen.editPagesPanel.addOption}
          </Button>
        </Box>
      )}
    </>
  );
};

export default PageProperties;
