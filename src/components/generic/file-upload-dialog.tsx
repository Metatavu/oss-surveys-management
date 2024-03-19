import strings from "../../localization/strings";
import GenericDialog from "./generic-dialog";
import LoaderWrapper from "./loader-wrapper";
import { Box, LinearProgress } from "@mui/material";
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
}

/**
 * Generic file uploader UI component
 *
 * @params props component properties
 */
const FileUploadDialog: FC<Props> = (props) => {
  const { open, onClose, maxFileSize, filesLimit, allowedFileTypes, onSave, uploadLoading } = props;
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File[] | null>(null);

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
      >
        <DropzoneArea
          onDrop={(files) => setUploadFile(files)}
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
      </GenericDialog>
    );
  };

  const handleSave = async (files: File[]) => {
    setUploading(true);
    onSave(files);
    setUploading(false);
  };

  return <LoaderWrapper loading={uploading}>{renderUploadDialog()}</LoaderWrapper>;
};

export default FileUploadDialog;
