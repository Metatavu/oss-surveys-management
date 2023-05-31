import { Device } from "../../generated/client";
import strings from "../../localization/strings";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";

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
 *
 * @param props component properties
 */
const StatisticDevices = ({ devices, selectedDevices, setSelectedDevices }: Props) => {
  /**
   * Handles device selection change
   *
   * @param checked whether checked
   * @param device Device object
   */
  const handleCheckboxChange = (checked: boolean, device: Device) => {
    if (checked) {
      setSelectedDevices([...selectedDevices, device]);
    } else {
      setSelectedDevices(selectedDevices.filter((item) => item.id !== device.id));
    }
  };

  /**
   * Renders device
   *
   * @param device device
   */
  const renderDevice = (device: Device) => {
    const isSelected = !!selectedDevices.find((dev) => dev.id === device.id);

    return (
      <FormControlLabel
        key={device.id}
        label={device.name ?? strings.generic.unnamed}
        name={device.id}
        checked={isSelected}
        control={
          <Checkbox onChange={(event) => handleCheckboxChange(event.target.checked, device)} />
        }
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
