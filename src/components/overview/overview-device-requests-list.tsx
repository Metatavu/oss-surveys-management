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
   * Renders action button
   *
   * @param isApproved is device request approved
   */
  const renderActionButton = (isApproved: boolean) => (
    <Button fullWidth variant="outlined" disabled={isApproved} onClick={() => setDialogOpen(true)}>
      {actionButtonText}
    </Button>
  );

  console.log("devices waiting for approval are: ", deviceRequests);

  return (
    <List>
      <ListHeader headings={listHeadings} />
      {deviceRequests.map((deviceRequest) => {
        if (!deviceRequest.approvalStatus) return;

        const isApproved = deviceRequest.approvalStatus === DeviceApprovalStatus.Approved;

        return (
          <Fragment key={deviceRequest.id}>
            <DeviceApprovalDialog
              deviceRequest={deviceRequest}
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              onConfirm={onClick}
            />
            <ListItem>
              <ListItemText secondary={deviceRequest.serialNumber} />
              <ListItemText
                secondaryTypographyProps={{
                  color: isApproved ? "primary" : "error"
                }}
                secondary={LocalizationUtils.getLocalizedDeviceApprovalStatus(
                  deviceRequest.approvalStatus
                )}
              />
              <ListItemText secondary={deviceRequest.description} />
              <ListItemText secondary={getCreationDate(deviceRequest)} />
              <ListItemText secondary={renderActionButton(isApproved)} />
            </ListItem>
          </Fragment>
        );
      })}
    </List>
  );
};

export default OverviewDeviceRequestsList;
