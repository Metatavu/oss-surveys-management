import { Device, DeviceSurvey, DeviceSurveyStatus, Survey } from "../../generated/client";
import DevicesPanel from "./devices-panel";
import PropertiesPanel from "./properties-panel";
import PublishDeviceInfo from "./publish-device-info";
import PublishProperties from "./publish-properties";
import { Stack } from "@mui/material";
import { useState } from "react";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  devices: Device[];
  deviceSurveys: DeviceSurvey[];
  publishSurveys: (deviceSurveys: DeviceSurvey[]) => Promise<void>;
}

/**
 * Publish survey component
 */
const PublishSurvey = ({ survey, devices, deviceSurveys, publishSurveys }: Props) => {
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  /**
   * Publishes survey
   *
   * @param publishStartTime publish start time
   * @param publishEndTime publish end time
   */
  const handlePublish = async (publishStartTime?: Date, publishEndTime?: Date) => {
    if (!survey.id) return;
    const deviceSurveys: DeviceSurvey[] = selectedDevices.map((device) => ({
      deviceId: device.id!,
      surveyId: survey.id!,
      status:
        publishStartTime && publishEndTime
          ? DeviceSurveyStatus.Scheduled
          : DeviceSurveyStatus.Published,
      publishStartTime: publishStartTime,
      publishEndTime: publishEndTime
    }));

    await publishSurveys(deviceSurveys);
  };

  return (
    <>
      <Stack direction="row" flex={1}>
        <PropertiesPanel width={250}>
          <DevicesPanel
            devices={devices}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
          />
        </PropertiesPanel>
        <PublishDeviceInfo devices={selectedDevices} deviceSurveys={deviceSurveys} />
        <PropertiesPanel width={250}>
          <PublishProperties
            survey={survey}
            selectedDevices={selectedDevices}
            publishSurvey={handlePublish}
          />
        </PropertiesPanel>
      </Stack>
    </>
  );
};

export default PublishSurvey;
