import { DeviceApprovalStatus, DeviceRequest } from "../../generated/client";
import strings from "../../localization/strings";
import LocalizationUtils from "../../utils/localization-utils";
import ListHeader from "../generic/list-header";
import DeviceApprovalDialog from "./device-approval-dialog";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { DateTime } from "luxon";
import { Fragment, useState } from "react";

/**
 * Components properties
 */
interface Props {
  deviceRequests: DeviceRequest[];
  actionButtonText: string;
  onClick: (deviceRequest: DeviceRequest) => Promise<void>;
}

/**
 * Overview screens Device Requests List component
 */
const OverviewDeviceRequestsList = ({ deviceRequests, actionButtonText, onClick }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openDeviceRequest, setOpenDeviceRequest] = useState<DeviceRequest>();

  const listHeadings = Object.values(strings.overviewScreen.deviceRequests.headings);

  /**
   * Gets Device Request creation date as string
   *
   * @param deviceRequest device request
   * @returns creation date as string
   */
  const getCreationDate = (deviceRequest: DeviceRequest) =>
    DateTime.fromMillis(deviceRequest.metadata?.createdAt?.valueOf() ?? 0).toFormat("dd.MM.yyyy");

  /**
   * Handle click to open device request dialog
   *
   * @param deviceRequest device request
   */
  const onDeviceRequestClick = (deviceRequest: DeviceRequest) => {
    setOpenDeviceRequest(deviceRequest);
    setDialogOpen(true);
  };

  /**
   * Renders action button
   *
   * @param isApproved is device request approved
   * @param deviceRequest Device request to be passed to dialog
   */
  const renderApproveButton = (isApproved: boolean, deviceRequest: DeviceRequest) => (
    <Button
      fullWidth
      variant="outlined"
      disabled={isApproved}
      onClick={() => onDeviceRequestClick(deviceRequest)}
    >
      {actionButtonText}
    </Button>
  );

  /**
   * Renders device request item
   *
   * @param deviceRequest Device request
   */
  const renderDeviceRequest = (deviceRequest: DeviceRequest) => {
    const { id, approvalStatus, serialNumber, description } = deviceRequest;
    if (!approvalStatus) {
      return null;
    }

    const isApproved = approvalStatus === DeviceApprovalStatus.Approved;

    return (
      <Fragment key={id}>
        <ListItem>
          <ListItemText secondary={serialNumber} />
          <ListItemText
            secondaryTypographyProps={{
              color: isApproved ? "primary" : "error"
            }}
            secondary={LocalizationUtils.getLocalizedDeviceApprovalStatus(approvalStatus)}
          />
          <ListItemText secondary={description} />
          <ListItemText secondary={getCreationDate(deviceRequest)} />
          <ListItemText secondary={renderApproveButton(isApproved, deviceRequest)} />
        </ListItem>
      </Fragment>
    );
  };

  /**
   * Renders device approval dialog
   */
  const renderDeviceApprovalDialog = () => {
    if (!openDeviceRequest) {
      return null;
    }

    return (
      <DeviceApprovalDialog
        deviceRequest={openDeviceRequest}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={onClick}
      />
    );
  };

  return (
    <>
      <List>
        <ListHeader headings={listHeadings} />
        {deviceRequests.map(renderDeviceRequest)}
      </List>
      {renderDeviceApprovalDialog()}
    </>
  );
};

export default OverviewDeviceRequestsList;
