import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { Page } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import GenericDialog from "../generic/generic-dialog";
import WithDebounce from "../generic/with-debounce";
import { Edit } from "@mui/icons-material";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import PageUtils, {
  EDITABLE_TEXT_PAGE_ELEMENTS,
  EditablePageElement,
  PageElementType
} from "../../utils/page-utils";
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
    setElementsToEdit(elements);
  }, [pageNumber]);

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
   * TODO: ADD DOCS
   */
  const getTextElementLabel = (type: PageElementType) => {
    if (type === PageElementType.H1) {
      return strings.editSurveysScreen.editPagesPanel.title;
    }
    if (type === PageElementType.P) {
      return strings.editSurveysScreen.editPagesPanel.infoText;
    }
  };

  /**
   * Handler for page property text change
   *
   * @param event event
   */
  const handleTextChange = async ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!pageToEdit) return;

      const foundProperty = pageToEdit?.properties?.find((p) => p.key === name);

      if (!foundProperty) return;
      const pageToUpdate = {
        ...pageToEdit,
        properties: pageToEdit.properties?.map((p) => (p.key === name ? { ...p, value: value } : p))
      };

      if (!pageToUpdate.id) return;

      setPageToEdit(
        await pagesApi.updateSurveyPage({
          surveyId: surveyId,
          pageId: pageToUpdate.id,
          page: pageToUpdate
        })
      );
      setSurveyPages(surveyPages.map((p) => (p.id !== pageToUpdate.id ? p : pageToUpdate)));
      toast.success(strings.editSurveysScreen.editPagesPanel.pageSaved);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.pageNotSaved}, ${error}`);
    }
  };

  /**
   * Renders text property editor
   *
   * @param element element
   */
  const renderTextPropertyEditor = (element: EditablePageElement) => (
    <Fragment key={element.id}>
      <Typography variant="h6">{getTextElementLabel(element.type)}</Typography>
      <WithDebounce
        name={element.id}
        value={pageToEdit?.properties?.find((property) => property.key === element.id)?.value ?? ""}
        onChange={handleTextChange}
        placeholder={getTextElementLabel(element.type) ?? ""}
        component={(props) => (
          <TextField
            {...props}
            fullWidth
            multiline
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Edit fontSize="small" color="primary" />
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </Fragment>
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
        {elementsToEdit
          .filter((element) => EDITABLE_TEXT_PAGE_ELEMENTS.includes(element.type))
          .map(renderTextPropertyEditor)}
      </Box>
    </>
  );
};

export default PageProperties;
