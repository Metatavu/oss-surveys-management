import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { Page, PageProperty } from "../../generated/client";
import { PagePropertyType } from "../../generated/client/models/PagePropertyType";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { LayoutType, QuestionType } from "../../types";
import GenericDialog from "../generic/generic-dialog";
import WithDebounce from "../generic/with-debounce";
import { Close, Edit } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
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
  const [backgrounds, _setBackgrounds] = useState<string[]>(["#fff", "#00AA46"]);

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
   * Handle title change
   */
  const handleTitleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatesToPage: Page = {
      ...surveyPages[pageNumber - 1],
      title: event.target.value
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
    } catch (error) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotSaved}, ${error}`);
    }
  };



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
      (property) => property.key === PagePropertyType.Options
    )
      ? surveyPages[pageNumber - 1].properties!.map((property) => {
        return property.key === PagePropertyType.Options
          ? { ...property, value: JSON.stringify(updatedOptions) }
          : property;
      })
      : [
        ...surveyPages[pageNumber - 1].properties!,
        {
          key: PagePropertyType.Options,
          value: JSON.stringify(updatedOptions)
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
   * Handle page background change
   */
  const handlePageBackgroundChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedProperties: PageProperty[] = surveyPages[pageNumber - 1].properties?.some(
      (property) => property.key === PagePropertyType.ImageUrl
    )
      ? surveyPages[pageNumber - 1].properties!.map((property) => {
        return property.key === PagePropertyType.ImageUrl
          ? { ...property, value: event.target.value }
          : property;
      })
      : [
        ...surveyPages[pageNumber - 1].properties!,
        {
          key: PagePropertyType.ImageUrl,
          value: event.target.value
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
    } catch (error) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotSaved}, ${error}`);
    }
  };

  /**
   * Handle question text change
   */
  const handlePageTextChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedProperties: PageProperty[] = surveyPages[pageNumber - 1].properties?.some( //Check page numbersdfgh
      (property) => property.key === PagePropertyType.Text
    )
      ? surveyPages[pageNumber - 1].properties!.map((property) => {
        return property.key === PagePropertyType.Text
          ? { ...property, value: event.target.value }
          : property;
      })
      : [
        ...surveyPages[pageNumber - 1].properties!,
        {
          key: PagePropertyType.Text,
          value: event.target.value
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
  const deleteOption = () => {
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

  /**
   * Get page title
   */
  const getPageTitle = () => {
    const title = surveyPages[pageNumber - 1].title;

    return title || "";
  };

  /**
   * Get page info text
   */
  const getPageInfo = () => {
    const infoText = surveyPages[pageNumber - 1].properties?.find(
      (property) => property.key === PagePropertyType.Text
    )?.value;

    return infoText || "";
  };

  /**
   * Switch event handler
   *
   * @param param event target
   */
  /* const handlePageButtonVisibilityChange = async ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    // TODO: Update on backend
    // const pageButtonVisibility = checked ? PageButtonVisibility.Block : PageButtonVisibility.None;

    // Lacks baceknd support
  }; */

  /**
 * Renders options text field with debounce
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
   * Renders title text field with debounce
   *
   * @param name name
   * @param onChange onChange event handler
   * @param value value
   * @param placeholder placeholder
   * @param endAdornment end adornment true/false
   * @returns debounced text field
   */
  const renderTitleWithDebounceTextField = (
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
 * Renders info text field with debounce
 *
 * @param name name
 * @param onChange onChange event handler
 * @param value value
 * @param placeholder placeholder
 * @param endAdornment end adornment true/false
 * @returns debounced text field
 */
  const renderInfoWithDebounceTextField = (
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
          multiline
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
   * Renders background options text field with debounce
   * 
   * @param name name
   * @param onChange onChange
   * @param value value
   * @param placeholder placeholder
   */
  const renderBackgroundOptionsWithDebounceTextField = (
    name: string,
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => Promise<void>,
    value: string,
    placeholder: string,
  ) => (
    <WithDebounce
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      component={props =>
        <TextField
          select
          size="small"
          variant="outlined"
          InputProps={{
            style: {
              backgroundColor: "fff",
              minWidth: 370,
              color: theme.palette.primary.main
            }
          }}
          {...props}
        >
          {backgrounds.map(background =>
            <MenuItem key={background} value={background}>
              {background}
            </MenuItem>
          )}
        </TextField>
      }
    />
  );

  /**
   * Renders question type select
   */
  const renderQuestionTypeSelect = () =>
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
    </Box>;

  /**
   * Renders question options
   */
  const renderQuestionOptions = () => (
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
  );

  /**
   * Renders pageButtonVisibility switch
   */
  const renderPageButtonVisibilitySwitch = () => (
    <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => console.log(e)}
              checked={true}
            />
          }
          label={strings.editSurveysScreen.editPagesPanel.buttonVisibility}
        />
      </FormGroup>
    </Box>
  );

  /**
   * Renders background image options
   */
  const renderBackgroundImageOptions = () => (
    <Box p={2}>
      <Typography variant="h6">
        {strings.editSurveysScreen.editPagesPanel.background}
      </Typography>
      {
        renderBackgroundOptionsWithDebounceTextField(
          "background",
          (e) => handlePageBackgroundChange(e),
          backgrounds[0],
          strings.editSurveysScreen.editSurveyPanel.name
        )
      }
    </Box>
  );

  /**
   * Render delete option dialog
   */
  const renderDeleteOptionDialog = () => (
    <GenericDialog
      title={strings.editSurveysScreen.editPagesPanel.confirmDeleteOption}
      open={deleteDialogOpen}
      onCancel={() => setDeleteDialogOpen(false)}
      onClose={() => setDeleteDialogOpen(false)}
      onConfirm={deleteOption}
      children={<div>{optionToDelete}</div>}
      confirmButtonText={strings.generic.confirm}
    />
  );

  /**
   * Render add new option button
   */
  const renderAddNewOptionButton = () => (
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
  );

  return (
    <>
      {renderDeleteOptionDialog()}

      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `${pageNumber}`)}
        </Typography>
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{strings.editSurveysScreen.editPagesPanel.title}</Typography>
        {renderTitleWithDebounceTextField(
          "title",
          handleTitleChange,
          getPageTitle(),
          strings.editSurveysScreen.editSurveyPanel.name,
          true
        )}
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{strings.editSurveysScreen.editPagesPanel.infoText}</Typography>
        {renderInfoWithDebounceTextField(
          "info",
          handlePageTextChange,
          getPageInfo(),
          strings.editSurveysScreen.editPagesPanel.infoText,
          true
        )}
      </Box>

      {renderPageButtonVisibilitySwitch()}

      {renderBackgroundImageOptions()}

      {!!pageLayouts.find((layout) => layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === LayoutType.QUESTION) && (
        renderQuestionTypeSelect()
      )}

      {!!pageLayouts.find(
        (layout) =>
          layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === LayoutType.QUESTION
      ) &&
        !!options.length && (
          renderQuestionOptions()
        )}

      {!!pageLayouts.find(
        (layout) =>
          layout.id === surveyPages[pageNumber - 1].layoutId && layout.name === LayoutType.QUESTION
      ) && (
          renderAddNewOptionButton()
        )}
    </>
  );
};

export default PageProperties;
