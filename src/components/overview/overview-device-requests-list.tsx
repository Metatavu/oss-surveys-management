import { Button, List, ListItem, ListItemText } from "@mui/material";
import { DeviceApprovalStatus, DeviceRequest } from "../../generated/client";
import strings from "../../localization/strings";
import ListHeader from "../generic/list-header";
import { DateTime } from "luxon";
import LocalizationUtils from "../../utils/localization-utils";

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
   * @param deviceRequest device request
   * @param isApproved is device request approved
   */
  const renderActionButton = (deviceRequest: DeviceRequest, isApproved: boolean) => (
    <Button
      fullWidth
      variant="outlined"
      disabled={isApproved}
      onClick={() => onClick(deviceRequest)}
    >
      {actionButtonText}
    </Button>
  );

  return (
    <List>
      <ListHeader headings={listHeadings} />
      {deviceRequests.map((deviceRequest) => {
        const isApproved = deviceRequest.approvalStatus === DeviceApprovalStatus.Approved;

        return (
          <ListItem key={deviceRequest.id}>
            <ListItemText secondary={deviceRequest.serialNumber} />
            <ListItemText
              secondaryTypographyProps={{
                color: isApproved ? "primary" : "error"
              }}
              secondary={LocalizationUtils.getLocalizedDeviceApprovalStatus(
                deviceRequest.approvalStatus!
              )}
            />
            <ListItemText secondary={strings.generic.notImplemented} />
            <ListItemText secondary={getCreationDate(deviceRequest)} />
            <ListItemText secondary={renderActionButton(deviceRequest, isApproved)} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default OverviewDeviceRequestsList;
