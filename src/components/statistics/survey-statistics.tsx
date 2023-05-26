import { pagesAtom } from "../../atoms/pages";
import { Device, DeviceSurvey, DeviceSurveyStatistics, Survey } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import PropertiesPanel from "../editor/properties-panel";
import StatisticDevices from "./statistic-devices";
import StatisticPage from "./statistic-page";
import StatisticsInfo from "./statistics-info";
import { Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

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
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [surveyStatistics, setSurveyStatistics] = useState<DeviceSurveyStatistics[]>([]);
  const [surveyPages] = useAtom(pagesAtom);

  /**
   * Gets Device survey statistics
   */
  const getDeviceSurveysStatistics = async () => {
    try {
      for (const device of devices) {
        if (!(device.id && survey.id && deviceSurveys)) continue;
        const deviceSurveyStatistics = await deviceSurveysApi.getDeviceSurveyStatistics({ deviceId: device.id, deviceSurveyId: deviceSurveys[0].id! });
        setSurveyStatistics([...surveyStatistics, deviceSurveyStatistics]);
      }
    } catch (error: any) {
      console.error(error);
      setSurveyStatistics([]);
    }
  };

  useEffect(() => {
    getDeviceSurveysStatistics();
  }, [survey, devices]);

  /**
 * Get most popular display
 */
  const getMostPopularDisplay = () => {
    const mostPopularDisplay = surveyStatistics?.sort((a, b) => {
      return b.totalAnswerCount - a.totalAnswerCount;
    })[0];

    const displayName = mostPopularDisplay && devices.find(device => device.id === mostPopularDisplay.deviceId)?.name;
    return displayName ?? strings.generic.unnamed;
  };

  /**
   * Get overall answer count
   */
  const overallAnswerCount = () => {
    let count = 0;
    surveyStatistics.forEach(statistic => {
      count += statistic.totalAnswerCount;
    });
    return count;
  };

  /**
   * Renders no content text if there is no statistics
   * 
   * @returns no content block
   */
  const renderNoContent = () => {
    if (surveyStatistics.length === 0) {
      return (
        <Stack flex={1} p={2} alignSelf="center" alignItems="center">
          <Typography variant="h6">
            {strings.surveyStatistics.noStatistics}
          </Typography>
        </Stack>
      );
    }
  };

  return (
    <>
      <Stack direction="row" flex={1}>
        <PropertiesPanel width={250}>
          <StatisticDevices
            devices={devices}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
          />
        </PropertiesPanel>
        <Stack direction={"column"} marginBottom={2} >
          {surveyStatistics.length > 0 ?
            surveyStatistics[0].questions.map(question =>
              <StatisticPage
                key={question.pageId}
                devices={selectedDevices}
                deviceSurveys={deviceSurveys}
                surveyStatistics={surveyStatistics}
                overallAnswerCount={overallAnswerCount()}
                question={question}
                pageTitle={question.pageTitle}
              />
            )
            :
            renderNoContent()}
        </Stack>
        <PropertiesPanel width={250}>
          <StatisticsInfo
            survey={survey}
            surveyStatistics={surveyStatistics}
            mostPopularDisplay={getMostPopularDisplay()}
            overallAnswerCount={overallAnswerCount()}
            surveyPages={surveyPages}
          />
        </PropertiesPanel>
      </Stack>


    </>
  );
};

export default SurveyStatistics;
