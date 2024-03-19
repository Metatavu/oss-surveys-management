import strings from "../../localization/strings";
import LoaderWrapper from "./loader-wrapper";
import { Button } from "@mui/material";
import { DropzoneDialog } from "mui-file-dropzone";
import { FC, useEffect, useState } from "react";

/**
 * Component props
 */
interface Props {
  open?: boolean;
  buttonText?: string;
  /**
   * File size in megabytes
   */
  maxFileSize?: number;
  controlled?: boolean;
  filesLimit?: number;
  allowedFileTypes: string[];
  onClose?: () => void;

  /**
   * Event callback for upload save click
   *
   * @param files files
   * @param key  upload key
   */
  onSave(files: File[], key?: string): void;
}

/**
 * Generic file uploader UI component
 *
 * @params props component properties
 */
const FileUploadDialog: FC<Props> = (props) => {
  const {
    open,
    buttonText,
    maxFileSize,
    controlled,
    filesLimit,
    allowedFileTypes,
    onClose,
    onSave
  } = props;
  const [uploading, setUploading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!controlled) {
      setDialogOpen(false);
    }
  }, [controlled]);

  const renderUploadDialog = () => {
    const bytes = maxFileSize ? maxFileSize * 1000000 : 2000000;

    return (
      <DropzoneDialog
        acceptedFiles={allowedFileTypes}
        open={controlled ? open : dialogOpen}
        onClose={controlled ? onClose : closeDialog}
        onSave={handleSave}
        cancelButtonText={strings.generic.cancel}
        submitButtonText={strings.generic.upload}
        showPreviewsInDropzone={false}
        maxFileSize={bytes}
        filesLimit={filesLimit || 1}
        fileObjects={[]}
      />
    );
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenClick = () => {
    if (!controlled) {
      openDialog();
    }
  };

  const handleSave = async (files: File[]) => {
    setUploading(true);

    if (!controlled) {
      closeDialog();
    }

    onSave(files);
    setUploading(false);
  };

  return (
    <LoaderWrapper loading={uploading}>
      {!controlled && (
        <Button disableElevation variant="contained" color="secondary" onClick={handleOpenClick}>
          {buttonText || strings.generic.loadNew}
        </Button>
      )}

      {renderUploadDialog()}
    </LoaderWrapper>
  );
};

export default FileUploadDialog;
