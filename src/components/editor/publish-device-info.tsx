import { Device, DeviceStatus, DeviceSurvey } from "../../generated/client";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import DeviceUtils from "../../utils/device-utils";
import LocalizationUtils from "../../utils/localization-utils";
import ListHeader from "../generic/list-header";
import { List, ListItem, ListItemText, Paper, Stack } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  devices: Device[];
  deviceSurveys: DeviceSurvey[];
}

/**
 * Publish device info component
 */
const PublishDeviceInfo = ({ devices, deviceSurveys }: Props) => {
  const listHeadings = Object.values(strings.publishSurveys.headings);
  return (
    <Stack flex={1} p={theme.spacing(4)} overflow="auto">
      <Paper>
        <List>
          <ListHeader headings={listHeadings} />
          {devices.map((device) => {
            if (!device.deviceStatus) return;

            return (
              <ListItem key={device.id}>
                <ListItemText secondary={device.name ?? strings.generic.unnamed} />
                <ListItemText
                  secondary={
                    DeviceUtils.getDeviceSurveyCount(device, deviceSurveys)
                      ? strings.generic.yes
                      : strings.generic.no
                  }
                />
                <ListItemText secondary={device.description} />
                <ListItemText
                  secondaryTypographyProps={{
                    color: device.deviceStatus === DeviceStatus.Offline ? "error" : "main"
                  }}
                  secondary={LocalizationUtils.getLocalizedDeviceStatus(device.deviceStatus)}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Stack>
  );
};

export default PublishDeviceInfo;
