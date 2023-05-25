import { Device, DeviceSurvey, DeviceSurveyStatistics, Survey } from "../../generated/client";
import DevicesPanel from "../editor/devices-panel";
import PropertiesPanel from "../editor/properties-panel";
import StatisticsInfo from "./statistics-info";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import StatisticPage from "./statistic-page";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atoms/error";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  devices: Device[];
  deviceSurveys: DeviceSurvey[];
}

/**
 * Survey statistics component
 */
const SurveyStatistics = ({ devices, deviceSurveys, survey }: Props) => {
  const { deviceSurveysApi } = useApi();
  const setError = useSetAtom(errorAtom);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [surveyStatistics, setSurveyStatistics] = useState<DeviceSurveyStatistics[]>([]);

  /**
   * Gets Device survey statistics
   */
  const getDeviceSurveysStatistics = async () => {
    try {
      for (const device of devices) {
        if (!device.id || !survey.id) continue;
        const deviceSurveyStatistics = await deviceSurveysApi.getDeviceSurveyStatistics({ deviceId: device.id, deviceSurveyId: survey.id }) ?? [];
        console.log(deviceSurveyStatistics);
        setSurveyStatistics([...surveyStatistics, deviceSurveyStatistics]);
        console.log("surveys statistic length", surveyStatistics.length);
      }
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.deviceSurveysNotFound}, ${error}`);
    }
  };

  useEffect(() => {
    getDeviceSurveysStatistics();
  }, [survey]);

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
        <StatisticPage devices={selectedDevices} deviceSurveys={deviceSurveys} />
        <PropertiesPanel width={250}>
          <StatisticsInfo survey={survey} surveyStatistics={surveyStatistics} />
        </PropertiesPanel>
      </Stack>
    </>
  );
};

export default SurveyStatistics;
