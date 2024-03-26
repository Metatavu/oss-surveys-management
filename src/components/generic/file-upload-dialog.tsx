import { Alert, Box, LinearProgress } from "@mui/material";
import { DropzoneArea } from "mui-file-dropzone";
import { useState } from "react";
import { MediaFile } from "../../generated/client";
import strings from "../../localization/strings";
import GenericDialog from "./generic-dialog";
import LoaderWrapper from "./loader-wrapper";

/**
 * Component props
 */
interface Props {
  open: boolean;
  /**
   * File size in megabytes
   */
  maxFileSize?: number;
  filesLimit?: number;
  allowedFileTypes: string[];
  onClose: () => void;

  /**
   * Event callback for upload save click
   *
   * @param files files
   * @param key  upload key
   */
  onSave(files: File[], key?: string): void;
  uploadLoading: boolean;
  backgroundImages: MediaFile[];
}

/**
 * File uploader dialog component
 *
 * @params props component properties
 */
const FileUploadDialog = ({
  open,
  onClose,
  maxFileSize,
  filesLimit,
  allowedFileTypes,
  onSave,
  uploadLoading,
  backgroundImages
}: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleClose = () => {
    setErrorMessage(undefined);
    onClose();
  };

  const renderUploadDialog = () => {
    const bytes = maxFileSize ? maxFileSize * 1000000 : 2000000;

    return (
      <GenericDialog
        title={strings.generic.upload}
        open={open}
        onClose={handleClose}
        onCancel={handleClose}
        onConfirm={() => uploadFile && handleSave(uploadFile)}
        cancelButtonText={strings.generic.cancel}
        confirmButtonText={strings.generic.upload}
        fullWidth
        disabled={!!errorMessage}
      >
        <DropzoneArea
          onDrop={(files) => handleDropFile(files)}
          onDelete={() => {
            setUploadFile(null);
            setErrorMessage(undefined);
          }}
          acceptedFiles={allowedFileTypes}
          maxFileSize={bytes}
          filesLimit={filesLimit || 1}
          fileObjects={[]}
        />
        {uploadLoading && (
          <Box sx={{ margin: 2 }}>
            <LinearProgress />
          </Box>
        )}
        {errorMessage && (
          <Alert sx={{ margin: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}
      </GenericDialog>
    );
  };

  const checkFileName = (file: File) => /[^\x00-\x7F]/gi.test(file.name);

  /**
   *  Handler when files are added to the drop zone
   *
   * @param files files
   */
  const handleDropFile = (files: File[]) => {
    if (checkFileName(files[0])) {
      setErrorMessage(strings.editSurveysScreen.editPagesPanel.uploadWarningInvalidCharacters);
      return;
    }

    if (backgroundImages.some((image) => image.name === files[0].name)) {
      setErrorMessage(strings.editSurveysScreen.editPagesPanel.uploadWarningDuplicateFileName);
      return;
    }

    setUploadFile(files);
    setErrorMessage(undefined);
  };

  /**
   *  Handler for when the save button is clicked
   *
   * @param files files
   */
  const handleSave = async (files: File[]) => {
    setUploading(true);
    onSave(files);
    setUploading(false);
  };

  return <LoaderWrapper loading={uploading}>{renderUploadDialog()}</LoaderWrapper>;
};

export default FileUploadDialog;
