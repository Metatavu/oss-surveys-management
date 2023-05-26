import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { Device, DeviceSurvey, DeviceSurveyQuestionStatistics, DeviceSurveyStatistics, Survey } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { EditablePageElement, PageElementType } from "../../types";
import PageUtils from "../../utils/page-utils";
import PropertiesPanel from "../editor/properties-panel";
import OverallStatisticsCharts from "./overall-statistics-charts";
import StatisticDevices from "./statistic-devices";
import StatisticPage from "./statistic-page";
import StatisticsInfo from "./statistics-info";
import { Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { DateTime } from "luxon";
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
  const [pageLayouts] = useAtom(layoutsAtom);

  const renderStatisticPage = (question: DeviceSurveyQuestionStatistics) => (
    <StatisticPage
      key={question.pageId}
      question={question}
      pageTitle={getQuestionTitle(question.pageId)}
    />);



  const getQuestionTitle = (pageId: string) => {
    const foundPage = surveyPages.find(x => x.id === pageId);
    if (!foundPage?.id) return "";
    const foundLayout = pageLayouts.find(x => x.id === foundPage?.layoutId);
    if (!foundLayout) return "";
    const elements: EditablePageElement[] = [];
    for (const variable of foundLayout?.layoutVariables ?? []) {

      if (!foundLayout) continue;

      const elementToEdit = PageUtils.getPageTextElementTypeAndId(foundLayout.html, variable.key);
      elements.push(elementToEdit);
    }

    return (foundPage.properties ?? []).find(y => y.key === elements.find(x => x.type === PageElementType.H1)?.id)?.value ?? "";

  }

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
 * get daily average answer count chart
 */
  const getDailyAverageAnswerCount = () => {
    const dailyChartdata = [
      { label: 'Ma', value: surveyStatistics[0].averages.weekDays[0] },
      { label: 'Ti', value: surveyStatistics[0].averages.weekDays[1] },
      { label: 'Ke', value: surveyStatistics[0].averages.weekDays[2] },
      { label: 'To', value: surveyStatistics[0].averages.weekDays[3] },
      { label: 'Pe', value: surveyStatistics[0].averages.weekDays[4] },
      { label: 'La', value: surveyStatistics[0].averages.weekDays[5] },
      { label: 'Su', value: surveyStatistics[0].averages.weekDays[6] }
    ];
    return dailyChartdata;
  };

  /**
   * Get hourly average answer count chart data
   */
  const getHourlyAverageAnswerCount = () => {
    let now = DateTime.now().set({ hour: 6 });
    const hourlyChartData = [];
    while (now.hour < 21) {
      let average = 0;

      for (let hourIndex = 0; hourIndex < 3; hourIndex++) {
        average += surveyStatistics[0].averages.hourly[now.toUTC().hour + hourIndex];
      }

      hourlyChartData.push({ label: `${now.hour} - ${now.hour + 3}`, value: average });
      now = now.plus({ hours: 3 });
    }

    return hourlyChartData;
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
        <Stack width="100%" direction={"column"} marginBottom={2} >
          {surveyStatistics.length > 0 &&
            <OverallStatisticsCharts
              devices={selectedDevices}
              surveyStatistics={surveyStatistics}
              overallAnswerCount={overallAnswerCount()}
              hourlyChartData={getHourlyAverageAnswerCount()}
              dailyChartData={getDailyAverageAnswerCount()}
            />}
          {surveyStatistics.length > 0 ?
            surveyStatistics[0].questions.map(renderStatisticPage)
            :
            renderNoContent()}
        </Stack>
        <PropertiesPanel width={250}>
          <StatisticsInfo
            survey={survey}
            overallAnswerCount={overallAnswerCount()}
          />
        </PropertiesPanel>
      </Stack>


    </>
  );
};

export default SurveyStatistics;
