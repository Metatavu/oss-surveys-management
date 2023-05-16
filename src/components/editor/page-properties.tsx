import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { Page, PageProperty, PagePropertyType } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { LayoutType, QuestionType } from "../../types";
import GenericDialog from "../generic/generic-dialog";
import WithDebounce from "../generic/with-debounce";
import { Close, Edit } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";

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
  const [options, setOptions] = useState<string[]>([]);

  const [surveyPages, setSurveyPages] = useAtom(pagesAtom);
  const [pageLayouts] = useAtom(layoutsAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState<string | undefined>();
  const { pagesApi } = useApi();
  const setError = useSetAtom(errorAtom);

  /**
   * Set the question options state if contained within the page properties
   */
  const getQuestionOptions = () => {
    const optionsArrayString = surveyPages[pageNumber - 1].properties?.find(
      (property) => property.key === PagePropertyType.Options
    )?.value;

    if (!optionsArrayString) {
      setOptions([]);
      return;
    }
    setOptions(JSON.parse(optionsArrayString));
  };

  useEffect(() => {
    getQuestionOptions();
  }, [pageNumber]);

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
  const renderOptionsWithDebounceTextField = (
    name: string,
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      previousOption?: string
    ) => Promise<void>,
    value: string,
    placeholder: string,
    endAdornment: boolean,
    key: string
  ) => (
    <WithDebounce
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      optionKey={key}
      component={(props) => (
        <TextField
          {...props}
          key={key}
          fullWidth
          multiline
          name={name}
          placeholder={strings.editSurveysScreen.editPagesPanel.answerOptionPlaceholder}
          InputProps={{
            endAdornment: endAdornment && (
              <InputAdornment position="end" className="on-hover">
                <IconButton
                  title={strings.editSurveysScreen.editPagesPanel.deleteAnswerOptionTitle}
                  onClick={() => handleDeleteClick(value)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );

  /**
   * Handle question option change
   *
   * @param event Event
   * @param id string
   */
  const handleQuestionOptionChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    previousOption: string
  ) => {
    const updatedOptions = options.map((option) => {
      return option === previousOption ? event.target.value : option;
    });

    const updatedProperties: PageProperty[] = surveyPages[pageNumber - 1].properties?.some(
      (property) => property.type === PagePropertyType.Options
    )
      ? surveyPages[pageNumber - 1].properties!.map((property) => {
        return property.type === PagePropertyType.Options
          ? { ...property, value: JSON.stringify(updatedOptions) }
          : property;
      })
      : [
        ...surveyPages[pageNumber - 1].properties!,
        {
          key: PagePropertyType.Options,
          value: JSON.stringify(updatedOptions),
          type: PagePropertyType.Options
        }
      ];

    const updatesToPage: Page = {
      ...surveyPages[pageNumber - 1],
      properties: updatedProperties
    };

    try {
      const updatedPage = await pagesApi.updateSurveyPage({
        pageId: surveyPages[pageNumber - 1].id!,
        surveyId: surveyId,
        page: updatesToPage
      });

      const updatedSurveyPages = surveyPages.map((page) =>
        page.id === updatedPage.id ? updatedPage : page
      );

      setSurveyPages(updatedSurveyPages);
      setOptions(updatedOptions);
    } catch (error) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotSaved}, ${error}`);
    }
  };

  /**
   * Adds new question option to question options
   */
  const addNewQuestionOption = () => setOptions([...options, ""]);

  /**
   * Removes the selected option from the list
   */
  const deleteOption = async () => {
    if (!optionToDelete) return;

    const updatedList = options.filter((option) => option !== optionToDelete);

    // TODO: Delete on backend
    setOptions(updatedList);
    setDeleteDialogOpen(false);
  };

  /**
   * Trigger delete confirm dialog and store option to be deleted state
   */
  const handleDeleteClick = (option: string) => {
    setDeleteDialogOpen(true);
    setOptionToDelete(option);
  };

  return (
    <>
      <GenericDialog
        title={strings.editSurveysScreen.editPagesPanel.confirmDeleteOption}
        open={deleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={deleteOption}
        children={<div>{optionToDelete}</div>}
        confirmButtonText={strings.generic.confirm}
      />
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `${pageNumber}`)}
        </Typography>
        {/* TODO: Update with Debounce when backend ready, should this even change? */}
        <TextField
          fullWidth
          multiline
          placeholder={
            strings.formatString(
              strings.editSurveysScreen.editPagesPanel.page,
              `${pageNumber}`
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
        <Typography variant="h6">{strings.editSurveysScreen.editPagesPanel.title}</Typography>
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
      {!!pageLayouts.find((layout) => layout.id === surveyPages[pageNumber - 1].layoutId) && (
        <Box p={2}>
          <Typography variant="h6">
            {strings.editSurveysScreen.editPagesPanel.questionType}
          </Typography>
          {/* TODO: Update with Debounce when backend ready */}
          <TextField
            fullWidth
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
      {!!pageLayouts.find(
        (layout) =>
          layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === LayoutType.QUESTION
      ) &&
        !!options.length && (
          <Box p={2}>
            <Typography variant="h6">
              {strings.editSurveysScreen.editPagesPanel.answerOptions}
            </Typography>
            {options.map((option, i) =>
              renderOptionsWithDebounceTextField(
                "option",
                (e) => handleQuestionOptionChange(e, option),
                option,
                "option",
                true,
                `${i}`
              )
            )}
          </Box>
        )}
      {!!pageLayouts.find(
        (layout) =>
          layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === LayoutType.QUESTION
      ) && (
          <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
            <Button
              size="large"
              variant="text"
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
