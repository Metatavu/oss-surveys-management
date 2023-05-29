import { Device } from "../../generated/client";
import strings from "../../localization/strings";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { ChangeEvent } from "react";

/**
 * Components properties
 */
interface Props {
  devices: Device[];
  selectedDevices: Device[];
  setSelectedDevices: (devices: Device[]) => void;
}

/**
 * Statistic devices panel component
 */
const StatisticDevices = ({ devices, selectedDevices, setSelectedDevices }: Props) => {
  /**
   * Handles device selection change
   *
   * @param event event
   */
  const handleCheckboxChange = ({ target: { checked, name } }: ChangeEvent<HTMLInputElement>) => {
    const foundDevice = devices.find((device) => device.id === name);

    if (!foundDevice?.id) return;

    if (checked) {
      setSelectedDevices([...selectedDevices, foundDevice]);
    } else {
      setSelectedDevices(selectedDevices.filter((device) => device.id !== foundDevice.id));
    }
  };
  /**
   * Renders device
   */
  const renderDevice = (device: Device) => {
    const isSelected = !!selectedDevices.find((dev) => dev.id === device.id);

    return (
      <FormControlLabel
        key={device.id}
        label={device.name ?? strings.generic.unnamed}
        name={device.id}
        checked={isSelected}
        control={<Checkbox onChange={handleCheckboxChange} />}
      />
    );
  };

  return (
    <Stack gap={2} p={2}>
      <Typography variant="h6">{strings.surveyStatistics.chooseStatisticsSource}</Typography>
      {devices.map(renderDevice)}
    </Stack>
  );
};

export default StatisticDevices;
