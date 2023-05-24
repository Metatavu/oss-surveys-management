import { Stack, TextField, Typography } from "@mui/material";
import { DeviceRequest } from "../../generated/client";
import strings from "../../localization/strings";
import GenericDialog from "../generic/generic-dialog";
import { ChangeEvent, useState } from "react";

/**
 * Components properties
 */
interface Props {
  deviceRequest: DeviceRequest;
  open: boolean;
  onClose: () => void;
  onConfirm: (deviceRequest: DeviceRequest) => Promise<void>;
}

/**
 * Device approval dialog component
 */
const DeviceApprovalDialog = ({ deviceRequest, open, onClose, onConfirm }: Props) => {
  const [newName, setNewName] = useState<string>();
  const [newDescription, setNewDescription] = useState<string>();
  const [newLocation, setNewLocation] = useState<string>();

  const {
    title,
    helperText,
    name,
    namePlaceholder,
    description,
    descriptionPlaceholder,
    location,
    locationPlaceholder,
    approve
  } = strings.overviewScreen.deviceRequests.dialog;

  /**
   * Event handler for name change events
   */
  const handleNameChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setNewName(value);

  /**
   * Event handler for description change events
   */
  const handleDescriptionChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setNewDescription(value);

  /**
   * Event handler for location change events
   */
  const handleLocationChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setNewLocation(value);

  /**
   * Renders text field with given label, placeholder, value and onChange handler
   *
   * @param label label
   * @param value value
   * @param placeholder placeholder
   * @param onChange onChange handler
   */
  const renderTextField = (
    label: string,
    placeholder: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value?: string
  ) => (
    <TextField
      sx={{ flex: 1 }}
      label={label}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      size="small"
    />
  );

  return (
    <GenericDialog
      fullWidth
      title={title}
      open={open}
      cancelButtonText={strings.generic.cancel}
      confirmButtonText={approve}
      onConfirm={() =>
        onConfirm({
          ...deviceRequest,
          name: newName,
          description: newDescription,
          location: newLocation
        })
      }
      onClose={onClose}
      onCancel={onClose}
    >
      <Stack>
        <Typography>{helperText}</Typography>
        {renderTextField(name, namePlaceholder, handleNameChange, newName)}
        {renderTextField(
          description,
          descriptionPlaceholder,
          handleDescriptionChange,
          newDescription
        )}
        {renderTextField(location, locationPlaceholder, handleLocationChange, newLocation)}
      </Stack>
    </GenericDialog>
  );
};

export default DeviceApprovalDialog;
