import { MediaFile } from "../../generated/client";
import strings from "../../localization/strings";
import GenericDialog from "./generic-dialog";
import LoaderWrapper from "./loader-wrapper";
import { Alert, Box, LinearProgress } from "@mui/material";
import { DropzoneArea } from "mui-file-dropzone";
import { FC, useState } from "react";

/**
 * Component props
 */
interface Props {
  open: boolean;
  buttonText?: string;
  /**
   * File size in megabytes
   */
  maxFileSize?: number;
  controlled?: boolean;
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
const FileUploadDialog: FC<Props> = (props) => {
  const {
    open,
    onClose,
    maxFileSize,
    filesLimit,
    allowedFileTypes,
    onSave,
    uploadLoading,
    backgroundImages
  } = props;
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File[] | null>(null);
  const [duplicateFileName, setDuplicateFileName] = useState(false);

  const renderUploadDialog = () => {
    const bytes = maxFileSize ? maxFileSize * 1000000 : 2000000;

    return (
      <GenericDialog
        title={strings.generic.upload}
        open={open}
        onClose={onClose}
        onCancel={onClose}
        onConfirm={() => uploadFile && handleSave(uploadFile)}
        cancelButtonText={strings.generic.cancel}
        confirmButtonText={strings.generic.upload}
        fullWidth
        disabled={duplicateFileName}
      >
        <DropzoneArea
          onDrop={(files) => handleDropFile(files)}
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
        {duplicateFileName && (
          <Alert sx={{ margin: 2 }} severity="error">
            {strings.editSurveysScreen.editPagesPanel.uploadWarning}
          </Alert>
        )}
      </GenericDialog>
    );
  };

  /**
   *  Handler when files are added to the drop zone
   *
   * @param files files
   */
  const handleDropFile = (files: File[]) => {
    if (backgroundImages.some((image) => image.name === files[0].name)) {
      setDuplicateFileName(true);
    } else {
      setUploadFile(files);
      setDuplicateFileName(false);
    }
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
