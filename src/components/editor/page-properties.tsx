import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { Layout, Page, PageQuestionOption } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import GenericDialog from "../generic/generic-dialog";
import { AddCircle, Edit, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  IconButton,
  Typography
} from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { ChangeEvent, FocusEvent, Fragment, useEffect, useState } from "react";
import PageUtils from "../../utils/page-utils";
import { EditablePageElement } from "../../types";
import { EDITABLE_TEXT_PAGE_ELEMENTS } from "../../constants";
import { toast } from "react-toastify";

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
  const [surveyPages, setSurveyPages] = useAtom(pagesAtom);
  const [pageLayouts] = useAtom(layoutsAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [optionToDelete, _] = useState<string>();
  const { pagesApi } = useApi();
  const setError = useSetAtom(errorAtom);
  const [pageToEdit, setPageToEdit] = useState<Page>();
  const [elementsToEdit, setElementsToEdit] = useState<EditablePageElement[]>([]);
  const [pageToEditLayout, setPageToEditLayout] = useState<Layout>();

  /**
   * Initializes editable pages properties
   */
  useEffect(() => {
    const foundPage = surveyPages.find((page) => page.orderNumber === pageNumber);
    const foundLayout = pageLayouts.find((layout) => layout.id === foundPage?.layoutId);
    const elements = [];
    for (const variable of foundLayout?.layoutVariables || []) {
      if (!foundPage?.properties?.some((property) => property.key === variable.key)) {
        foundPage?.properties?.push({ key: variable.key, value: "" });
      }

      if (!foundLayout) continue;

      const elementToEdit = PageUtils.getPageTextElementTypeAndId(foundLayout.html, variable.key);
      elements.push(elementToEdit);
    }
    setPageToEdit(foundPage);
    setPageToEditLayout(foundLayout);
    setElementsToEdit(elements);
  }, [pageNumber]);

  /**
   * Saves page
   *
   * @param page page
   */
  const savePage = async (page: Page) => {
    try {
      if (!page?.id) return;
      setPageToEdit(
        await pagesApi.updateSurveyPage({
          surveyId: surveyId,
          pageId: page.id,
          page: page
        })
      );
      setSurveyPages(surveyPages.map((p) => (p.id !== page.id ? p : page)));
      toast.success(strings.editSurveysScreen.editPagesPanel.pageSaved);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotSaved}, ${error}`);
    }
  };

  /**
   * Render delete option dialog
   */
  const renderDeleteOptionDialog = () => (
    <GenericDialog
      title={strings.editSurveysScreen.editPagesPanel.confirmDeleteOption}
      open={deleteDialogOpen}
      onCancel={() => setDeleteDialogOpen(false)}
      onClose={() => setDeleteDialogOpen(false)}
      onConfirm={() => null}
      children={<div>{optionToDelete}</div>}
      confirmButtonText={strings.generic.confirm}
    />
  );

  /**
   * Handler for page property text change
   *
   * @param event event
   */
  const handleTextChange = async ({ target: { value, name } }: FocusEvent<HTMLInputElement>) => {
    if (!pageToEdit) return;

    const foundProperty = pageToEdit?.properties?.find((p) => p.key === name);

    if (!foundProperty || foundProperty.value === value) return;
    const pageToUpdate = {
      ...pageToEdit,
      properties: pageToEdit.properties?.map((property) =>
        property.key === name ? { ...property, value: value } : property
      )
    };

    if (!pageToUpdate.id) return;
    await savePage(pageToUpdate);
  };

  /**
   * Handler for page next button visiblity change
   *
   * @param event event
   */
  const handleButtonVisiblitySwitch = async ({
    target: { checked }
  }: ChangeEvent<HTMLInputElement>) => {
    if (!pageToEdit) return;
    const pageToUpdate = {
      ...pageToEdit,
      nextButtonVisible: checked
    };
    await savePage(pageToUpdate);
  };

  /**
   * Handler for question option text change
   *
   * @param event event
   */
  const handleOptionChange = async ({ target: { value, name } }: FocusEvent<HTMLInputElement>) => {
    if (!pageToEdit?.question) return;

    const optionToUpdate = pageToEdit.question.options.find((option) => option.id === name);

    if (!optionToUpdate || optionToUpdate.questionOptionValue === value) return;

    const pageToUpdate: Page = {
      ...pageToEdit,
      question: {
        ...pageToEdit.question,
        options: [
          ...pageToEdit.question.options.map((option) =>
            option.id === name ? { ...option, questionOptionValue: value } : option
          )
        ]
      }
    };

    await savePage(pageToUpdate);
  };

  /**
   * Handler for add new option button click
   */
  const handleNewOptionClick = async () => {
    if (!pageToEdit?.question) return;

    const orderNumber = pageToEdit.question.options.length + 1;
    const pageToUpdate: Page = {
      ...pageToEdit,
      question: {
        ...pageToEdit.question,
        options: [
          ...pageToEdit.question.options,
          {
            questionOptionValue: strings.formatString(
              strings.editSurveysScreen.editPagesPanel.answerOptionPlaceholder,
              orderNumber
            ) as string,
            orderNumber: orderNumber
          }
        ]
      }
    };

    await savePage(pageToUpdate);
  };

  /**
   * Handler for question delete click
   *
   * @param option option
   */
  const handleDeleteClick = async (option: PageQuestionOption) => {
    if (!pageToEdit?.question) return;

    const filteredOptions = pageToEdit.question.options.filter((opt) => opt !== option);

    const pageToUpdate = {
      ...pageToEdit,
      question: {
        ...pageToEdit.question,
        options: filteredOptions.map((opt) =>
          opt.orderNumber > option.orderNumber ? { ...opt, orderNumber: opt.orderNumber - 1 } : opt
        )
      }
    };

    await savePage(pageToUpdate);
  };

  /**
   * Renders text property editor
   *
   * @param element element
   */
  const renderTextPropertyEditor = (element: EditablePageElement) => (
    <Fragment key={element.id}>
      <Typography variant="h6">{PageUtils.getTextPropertyLabel(element.type)}</Typography>
      <TextField
        name={element.id}
        defaultValue={
          pageToEdit?.properties?.find((property) => property.key === element.id)?.value ?? ""
        }
        placeholder={PageUtils.getTextPropertyLabel(element.type) ?? ""}
        fullWidth
        multiline
        onBlur={handleTextChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Edit fontSize="small" color="primary" />
            </InputAdornment>
          )
        }}
      />
    </Fragment>
  );

  /**
   * Renders pages question options
   */
  const renderOptions = () => {
    if (!pageToEdit?.question) return;

    return pageToEdit.question.options.map((option) => (
      <TextField
        key={option.id}
        name={option.id}
        defaultValue={option.questionOptionValue}
        onBlur={handleOptionChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className="on-hover">
              <IconButton
                title={strings.editSurveysScreen.editPagesPanel.deleteAnswerOptionTitle}
                onClick={() => handleDeleteClick(option)}
              >
                <Close fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    ));
  };

  /**
   * Renders add new option button
   */
  const renderAddNewOption = () => {
    if (!pageToEdit?.question) return;

    return (
      <Button startIcon={<AddCircle />} onClick={handleNewOptionClick}>
        {strings.editSurveysScreen.editPagesPanel.addOption}
      </Button>
    );
  };

  return (
    <>
      {renderDeleteOptionDialog()}
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">
          {strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `${pageNumber}`)}
        </Typography>
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        {elementsToEdit
          .filter((element) => EDITABLE_TEXT_PAGE_ELEMENTS.includes(element.type))
          .map(renderTextPropertyEditor)}
      </Box>
      {PageUtils.hasQuestionsPlaceholder(pageToEditLayout?.html) && (
        <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
          <Typography variant="h6">{strings.editSurveysScreen.editPagesPanel.addOption}</Typography>
          {renderOptions()}
          {renderAddNewOption()}
        </Box>
      )}
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <FormControlLabel
          label={strings.editSurveysScreen.editPagesPanel.buttonVisibility}
          control={
            <Switch
              checked={pageToEdit?.nextButtonVisible ?? false}
              onChange={handleButtonVisiblitySwitch}
            />
          }
        />
      </Box>
    </>
  );
};

export default PageProperties;
