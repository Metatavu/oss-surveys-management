import { Device, DeviceSurvey, DeviceSurveyStatus, Survey } from "../../generated/client";
import SurveyUtils from "../../utils/survey-utils";
import DevicesPanel from "./devices-panel";
import PropertiesPanel from "./properties-panel";
import PublishDeviceInfo from "./publish-device-info";
import PublishProperties from "./publish-properties";
import { Stack } from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

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
   * Get list of devices the selected survey is published on
   */
  const getActiveDevices = () => {
    const activeDevices = SurveyUtils.getSurveysPublishedDevices(survey, deviceSurveys, devices);
    if (!activeDevices) return;

    setSelectedDevices(activeDevices);
  };

  useEffect(() => {
    getActiveDevices();
  }, []);

  /**
   * Publishes survey
   *
   * @param publishStartTime publish start time
   * @param publishEndTime publish end time
   */
  const handlePublish = async (publishStartTime: DateTime, publishEndTime: DateTime) => {
    if (!survey.id) return;

    const currentTime = DateTime.now();
    const deviceSurveys: DeviceSurvey[] = selectedDevices.map((device) => ({
      deviceId: device.id!,
      surveyId: survey.id!,
      status:
        currentTime < publishStartTime
          ? DeviceSurveyStatus.Scheduled
          : DeviceSurveyStatus.Published,
      publishStartTime: publishStartTime?.toJSDate(),
      publishEndTime: publishEndTime?.toJSDate()
    }));

    await publishSurveys(deviceSurveys);
  };

  return (
    <>
      <Stack direction="row" flex={1} overflow="hidden">
        <PropertiesPanel width={250}>
          <DevicesPanel
            devices={devices}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
          />
        </PropertiesPanel>
        <PublishDeviceInfo devices={selectedDevices} deviceSurveys={deviceSurveys} />
        <PropertiesPanel width={300}>
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
