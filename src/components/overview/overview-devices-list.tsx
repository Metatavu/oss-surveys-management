import { Button, List, ListItem, ListItemText } from "@mui/material";
import { Device, DeviceStatus } from "../../generated/client";
import strings from "../../localization/strings";
import ListHeader from "../generic/list-header";
import LocalizationUtils from "../../utils/localization-utils";

/**
 * Components properties
 */
interface Props {
  devices: Device[];
  actionButtonText: string;
  onClick: (device: Device) => Promise<void>;
}

/**
 * Overview screens Devices List component
 */
const OverviewDevicesList = ({ devices, onClick, actionButtonText }: Props) => {
  const listHeadings = Object.values(strings.overviewScreen.devices.headings);

  /**
   * Renders action button
   *
   * @param device device
   */
  const renderActionButton = (device: Device) => (
    <Button fullWidth variant="outlined" onClick={() => onClick(device)}>
      {actionButtonText}
    </Button>
  );

  return (
    <List>
      <ListHeader headings={listHeadings} />
      {devices.map((device) => (
        <ListItem key={device.id}>
          <ListItemText secondary={device.name ?? strings.generic.unnamed} />
          <ListItemText
            secondaryTypographyProps={{
              color: device.deviceStatus === DeviceStatus.Offline ? "error" : "main"
            }}
            secondary={LocalizationUtils.getLocalizedDeviceStatus(device.deviceStatus!)}
          />
          <ListItemText secondary={device.description} />
          <ListItemText secondary={device.location ?? "-"} />
          <ListItemText secondary={renderActionButton(device)} />
        </ListItem>
      ))}
    </List>
  );
};

export default OverviewDevicesList;
