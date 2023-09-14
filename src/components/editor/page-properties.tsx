import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { EDITABLE_TEXT_PAGE_ELEMENTS, PAGE_BACKGROUNDS, PAGE_IMAGES } from "../../constants";
import {
  Layout,
  Page,
  PageProperty,
  PageQuestionOption,
  PageQuestionType
} from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { EditablePageElement, PageElementType } from "../../types";
import LocalizationUtils from "../../utils/localization-utils";
import PageUtils from "../../utils/page-utils";
import GenericDialog from "../generic/generic-dialog";
import { AddCircle, Close, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import isEqual from "lodash.isequal";
import { ChangeEvent, FocusEvent, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "usehooks-ts";

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
  const mounted = useRef(true);
  const [surveyPages, setSurveyPages] = useAtom(pagesAtom);
  const [pendingPages, setPendingPages] = useState(surveyPages);
  const debouncedPages = useDebounce(pendingPages, 1000);
  const [pageLayouts] = useAtom(layoutsAtom);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [optionToDelete, _] = useState<string>();
  const { pagesApi } = useApi();
  const setError = useSetAtom(errorAtom);

  /**
   * Updates mounted flag when component mounts and unmounts
   */
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useEffect(() => {
    setPendingPages(surveyPages);
  }, [surveyPages]);

  /**
   * Save pages
   */
  const savePages = async () => {
    if (isEqual(surveyPages, pendingPages)) return;
    setSurveyPages(
      await Promise.all(
        debouncedPages.map((page) =>
          pagesApi.updateSurveyPage({
            surveyId: surveyId,
            pageId: page.id!,
            page: page
          })
        )
      )
    );

    toast.success(strings.editSurveysScreen.editPagesPanel.pageSaved);
  };

  /**
   * Saves pages when page changes
   */
  useEffect(() => {
    savePages().catch((error) =>
      setError(`${strings.errorHandling.editSurveysScreen.pageNotSaved}, ${error}`)
    );
  }, [debouncedPages]);

  /**
   * Initializes editable pages properties
   */
  const [pageToEdit, pageToEditLayout, elementsToEdit] = useMemo<
    [Page | undefined, Layout | undefined, EditablePageElement[]]
  >(() => {
    const foundPage = pendingPages.find((page) => page.orderNumber === pageNumber);
    const foundLayout = pageLayouts.find((layout) => layout.id === foundPage?.layoutId);
    const elements: EditablePageElement[] = [];
    for (const variable of foundLayout?.layoutVariables ?? []) {
      if (foundPage?.properties?.every((property) => property.key !== variable.key)) {
        foundPage?.properties?.push({ key: variable.key, value: "" });
      }

      if (foundLayout) {
        const elementToEdit = PageUtils.getPageTextElementTypeAndId(foundLayout.html, variable.key);
        elements.push(elementToEdit);
      }
    }

    return [foundPage, foundLayout, elements];
  }, [pageNumber, pendingPages, pageLayouts]);

  /**
   * Render delete option dialog
   */
  const renderDeleteOptionDialog = () => (
    <GenericDialog
      title={strings.editSurveysScreen.editPagesPanel.confirmDeleteOption}
      open={deleteDialogOpen}
      onCancel={() => mounted && setDeleteDialogOpen(false)}
      onClose={() => mounted && setDeleteDialogOpen(false)}
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
  const handleTextChange = ({ target: { value, name } }: FocusEvent<HTMLInputElement>) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);

      if (!pageToUpdate) return pages;

      const foundProperty = pageToUpdate?.properties?.find((property) => property.key === name);

      if (!foundProperty || foundProperty.value === value) return pages;

      const foundPage = pendingPages.find((page) => page.orderNumber === pageNumber);
      const foundLayout = pageLayouts.find((layout) => layout.id === foundPage?.layoutId);

      if (!foundLayout) return pages;

      const elementType = PageUtils.getPageTextElementTypeAndId(foundLayout?.html, name);
      const serializedValue = PageUtils.serializeChangeEventValue(value, elementType.type);

      if (serializedValue) {
        const updatedPage = {
          ...pageToUpdate,
          properties: pageToUpdate.properties?.map((property) =>
            property.key === name ? { ...property, value: serializedValue } : property
          )
        };

        return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
      }

      const updatedPage = {
        ...pageToUpdate,
        properties: pageToUpdate.properties?.map((property) =>
          property.key === name ? { ...property, value: value } : property
        )
      };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handler for page next button visiblity change
   *
   * @param event event
   */
  const handleButtonVisiblitySwitch = async ({
    target: { checked }
  }: ChangeEvent<HTMLInputElement>) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);

      if (!pageToUpdate) return pages;

      const updatedPage = { ...pageToUpdate, nextButtonVisible: checked };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handler for question option text change
   *
   * @param event event
   */
  const handleOptionChange = ({ target: { value, name } }: FocusEvent<HTMLInputElement>) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);

      if (!pageToUpdate?.question) return pages;

      const optionToUpdate = pageToUpdate.question.options.find((option) => option.id === name);

      if (!optionToUpdate || optionToUpdate.questionOptionValue === value) return pages;

      const updatedPage = {
        ...pageToUpdate,
        question: {
          ...pageToUpdate.question,
          options: [
            ...pageToUpdate.question.options.map((option) =>
              option.id === name ? { ...option, questionOptionValue: value } : option
            )
          ]
        }
      };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handler for add new option button click
   */
  const handleNewOptionClick = () => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);

      if (!pageToUpdate?.question) return pages;

      const orderNumber = pageToUpdate.question.options.length + 1;

      const updatedPage = {
        ...pageToUpdate,
        question: {
          ...pageToUpdate.question,
          options: [
            ...pageToUpdate.question.options,
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

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handler for question delete click
   *
   * @param option option
   */
  const handleDeleteClick = (option: PageQuestionOption) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);

      if (!pageToUpdate?.question) return pages;

      const filteredOptions = pageToUpdate.question.options.filter((opt) => opt.id !== option.id);

      const updatedPage = {
        ...pageToUpdate,
        question: {
          ...pageToUpdate.question,
          options: filteredOptions.map((opt) =>
            opt.orderNumber > option.orderNumber
              ? { ...opt, orderNumber: opt.orderNumber - 1 }
              : opt
          )
        }
      };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handler for background change event
   *
   * @param value new value
   */
  const handleBackgroundChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);

      if (!pageToUpdate) return pages;

      const backgroundProperty = elementsToEdit.find(
        (element) => element.type === PageElementType.DIV
      );

      if (!backgroundProperty?.id) return pages;

      const updatedProperty: PageProperty = {
        key: backgroundProperty?.id,
        value: value === "DEFAULT" ? "" : value
      };

      const updatedPage = {
        ...pageToUpdate,
        properties: pageToUpdate.properties?.map((property) =>
          property.key === backgroundProperty?.id ? updatedProperty : property
        )
      };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handler for image change event
   *
   * @param value new value
   */
  const handleImageChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);
      if (!pageToUpdate) return pages;

      const imageProperty = elementsToEdit.find((element) => element.type === PageElementType.IMG);

      if (!imageProperty?.id) return pages;

      const updatedProperty: PageProperty = {
        key: imageProperty?.id,
        value: !value ? "" : value
      };

      const updatedPage = {
        ...pageToUpdate,
        properties: pageToUpdate.properties?.map((property) =>
          property.key === imageProperty?.id ? updatedProperty : property
        )
      };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Handles question type change
   *
   * @param event event
   */
  const handleQuestionTypeChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPendingPages((pages) => {
      const pageToUpdate = pages.find((page) => page.id === pageToEdit?.id);
      if (!pageToUpdate?.question) return pages;

      const updatedPage = {
        ...pageToUpdate,
        question: {
          ...pageToUpdate.question,
          type: value as PageQuestionType
        }
      };

      return surveyPages.map((page) => (page.id === updatedPage.id ? updatedPage : page));
    });
  };

  /**
   * Renders text property editor
   *
   * @param element element
   */
  const renderTextPropertyEditor = (element: EditablePageElement) => {
    const property = pageToEdit?.properties?.find((property) => property.key === element.id);

    return (
      <Fragment key={`${pageToEdit?.id ?? ""}-${property?.key ?? ""}`}>
        <Typography variant="h6">{PageUtils.getTextPropertyLabel(element.type)}</Typography>
        <TextField
          name={element.id}
          defaultValue={
            PageUtils.getSerializedHTMLInnerHtmlValues(property?.value || "", element.type) ?? ""
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
  };

  /**
   * Renders pages question options
   */
  const renderOptions = () => {
    if (!pageToEdit?.question) return;

    return pageToEdit.question.options.map((option) => (
      <TextField
        key={option.id ?? `option-${option.orderNumber}`}
        name={option.id}
        defaultValue={option.questionOptionValue}
        onBlur={handleOptionChange}
        fullWidth
        multiline
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

  /**
   * Renders background change
   */
  const renderBackgroundChange = () => {
    if (!pageToEdit?.properties) return;

    return (
      <TextField
        fullWidth
        select
        onChange={handleBackgroundChange}
        value={PageUtils.getPageBackground(elementsToEdit, pageToEdit.properties) ?? ""}
      >
        {PAGE_BACKGROUNDS.map((background) => (
          <MenuItem key={background.key} value={background.value}>
            {LocalizationUtils.getTranslatedBackground(background.key)}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  /**
   * Renders image change
   */
  const renderImageChange = () => {
    if (!pageToEdit?.properties) return;

    return (
      <TextField
        fullWidth
        select
        onChange={handleImageChange}
        value={PageUtils.getPageImage(elementsToEdit, pageToEdit?.properties) ?? ""}
      >
        {PAGE_IMAGES.map((image) => (
          <MenuItem key={image.key} value={image.value}>
            {LocalizationUtils.getTranslatedImage(image.key)}
          </MenuItem>
        ))}
      </TextField>
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
          // TODO: this sorting is a temporary fix until the page layout order is persisted from the backend
          .sort((a, b) => {
            if (a.type === PageElementType.H1 && b.type === PageElementType.P) {
              return -1;
            } else if (a.type === PageElementType.P && b.type === PageElementType.H1) {
              return 1;
            } else {
              return 0;
            }
          })
          .map(renderTextPropertyEditor)}
      </Box>
      {PageUtils.hasQuestionsPlaceholder(pageToEditLayout?.html) && (
        <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
          <Stack direction="row">
            <Typography variant="h6" flex={0.5}>
              {strings.editSurveysScreen.editPagesPanel.question}
            </Typography>
            <TextField
              fullWidth
              select
              sx={{ flex: 0.5 }}
              value={pageToEdit?.question?.type ?? ""}
              onChange={handleQuestionTypeChange}
            >
              <MenuItem value={PageQuestionType.SingleSelect}>
                {strings.editSurveysScreen.editPagesPanel.questionTypes.singleSelect}
              </MenuItem>
              <MenuItem value={PageQuestionType.MultiSelect}>
                {strings.editSurveysScreen.editPagesPanel.questionTypes.multiSelect}
              </MenuItem>
            </TextField>
          </Stack>
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
      {PageUtils.hasImagePlaceholder(pageToEditLayout?.html) && (
        <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
          <Typography variant="h6">{strings.editSurveysScreen.editPagesPanel.image}</Typography>
          {renderImageChange()}
        </Box>
      )}
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{strings.editSurveysScreen.editPagesPanel.background}</Typography>
        {renderBackgroundChange()}
      </Box>
    </>
  );
};

export default PageProperties;
