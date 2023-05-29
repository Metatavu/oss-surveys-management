import { PageQuestionType } from "../../generated/client";
import strings from "../../localization/strings";
import GenericDialog from "../generic/generic-dialog";
import { FormControlLabel, Radio, RadioGroup, Stack, Tooltip, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

/**
 * Components properties
 */
interface Props {
  open: boolean;
  pageId?: string;
  onClose: () => void;
  onAddQuestion: (questionType: PageQuestionType, pageId: string) => Promise<void>;
}

/**
 * Add question dialog component
 */
const AddQuestionDialog = ({ open, pageId, onClose, onAddQuestion }: Props) => {
  const [selectedQuestionType, setSelectedQuestionType] = useState<PageQuestionType>(
    PageQuestionType.SingleSelect
  );

  const { title, singleSelect, multiSelect, freeText, description, addQuestion } =
    strings.editSurveysScreen.addQuestion.dialog;

  /**
   * Handles adding question
   */
  const handleAddQuestion = async () => {
    if (!pageId) return;
    await onAddQuestion(selectedQuestionType, pageId);
  };

  /**
   * Handler for question type radio change
   *
   * @param event event
   */
  const handleQuestionTypeChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setSelectedQuestionType(value as PageQuestionType);

  return (
    <GenericDialog
      fullWidth
      title={title}
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleAddQuestion}
      confirmButtonText={addQuestion}
      cancelButtonText={strings.generic.cancel}
    >
      <Stack direction="column" gap={2}>
        <Typography>{description}</Typography>
        <RadioGroup
          value={selectedQuestionType}
          onChange={handleQuestionTypeChange}
          sx={{ paddingLeft: 5 }}
        >
          <FormControlLabel
            value={PageQuestionType.SingleSelect}
            control={<Radio />}
            label={singleSelect}
          />
          <FormControlLabel
            value={PageQuestionType.MultiSelect}
            control={<Radio />}
            label={multiSelect}
          />
          <Tooltip title={strings.generic.notImplemented} placement="bottom-start">
            <FormControlLabel
              value={PageQuestionType.Freetext}
              disabled
              control={<Radio />}
              label={freeText}
            />
          </Tooltip>
        </RadioGroup>
      </Stack>
    </GenericDialog>
  );
};

export default AddQuestionDialog;
