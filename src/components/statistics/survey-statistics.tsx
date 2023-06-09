import { errorAtom } from "../../atoms/error";
import { layoutsAtom } from "../../atoms/layouts";
import { pagesAtom } from "../../atoms/pages";
import { END_HOUR, HOUR_GROUPING, START_HOUR } from "../../constants";
import { Device, DeviceSurveyStatistics, Survey } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { EditablePageElement, PageElementType, SurveyQuestionStatistics } from "../../types";
import PageUtils from "../../utils/page-utils";
import PropertiesPanel from "../editor/properties-panel";
import OverallStatisticsCharts from "./overall-statistics-charts";
import StatisticDevices from "./statistic-devices";
import StatisticPage from "./statistic-page";
import StatisticsInfo from "./statistics-info";
import { Stack, Typography, styled } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  devices: Device[];
}

/**
 * Styled scrollable content
 */
const Content = styled(Stack, {
  label: "statistic-scrollable-content"
})(({ theme }) => ({
  padding: theme.spacing(3),
  flexDirection: "column",
  width: "100%",
  marginBottom: theme.spacing(2),
  overflowY: "auto"
}));

/**
 * Survey statistics component
 *
 * @param props component properties
 */
const SurveyStatistics = ({ devices, survey }: Props) => {
  const { deviceSurveysApi, devicesApi } = useApi();
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [surveyStatistics, setSurveyStatistics] = useState<DeviceSurveyStatistics[]>([]);
  const [devicesWithSurvey, setDevicesWithSurvey] = useState<Device[]>([]);
  const [surveyPages] = useAtom(pagesAtom);
  const [pageLayouts] = useAtom(layoutsAtom);
  const setError = useSetAtom(errorAtom);

  /**
   * Return question title
   *
   * @param pageId page id
   * @returns question title
   */
  const getQuestionTitle = (pageId: string) => {
    const foundPage = surveyPages.find((page) => page.id === pageId);
    if (!foundPage?.id) return "";
    const foundLayout = pageLayouts.find((layout) => layout.id === foundPage?.layoutId);
    if (!foundLayout) return "";

    const elements: EditablePageElement[] = [];
    for (const variable of foundLayout?.layoutVariables ?? []) {
      const elementToEdit = PageUtils.getPageTextElementTypeAndId(foundLayout.html, variable.key);
      elements.push(elementToEdit);
    }

    return (
      (foundPage.properties ?? []).find(
        (property) =>
          property.key === elements.find((element) => element.type === PageElementType.H1)?.id
      )?.value ?? ""
    );
  };

  /**
   * Gets Device survey statistics
   */
  const getDeviceSurveysStatistics = async () => {
    const selectedDeviceSurveyStatistics = await Promise.all(
      selectedDevices.map((selectedDevice) => {
        return deviceSurveysApi.getDeviceSurveyStatistics({
          deviceId: selectedDevice.id!,
          surveyId: survey.id!
        });
      })
    );

    setSurveyStatistics(selectedDeviceSurveyStatistics);
  };

  useEffect(() => {
    getDeviceSurveysStatistics().catch((error) => setError(error));
  }, [survey, selectedDevices]);

  /**
   * Gets devices with the selected survey
   */
  const getDevicesWithSelectedSurvey = async () => {
    const allFoundDeviceSurveys = [];
    for (const device of devices) {
      if (!device.id) continue;
      const foundDeviceSurveys = await getDeviceSurveysByDevice(device.id);
      if (!foundDeviceSurveys?.length) continue;
      allFoundDeviceSurveys.push(...foundDeviceSurveys);
    }

    const selectedSurveyDeviceSurveys = allFoundDeviceSurveys.filter(
      (deviceSurvey) => deviceSurvey.surveyId === survey.id
    );

    const devicesWithSurvey: Device[] = selectedSurveyDeviceSurveys
      .flatMap(deviceSurvey => devices.find(device => device.id === deviceSurvey.deviceId) || []);

    setDevicesWithSurvey([...devices]);
    setSelectedDevices(devicesWithSurvey);
  };

  /**
   * Gets Device Surveys for a specific device
   *
   * @param deviceId device id
   */
  const getDeviceSurveysByDevice = async (deviceId: string) => {
    try {
      return await deviceSurveysApi.listDeviceSurveys({ deviceId: deviceId, maxResults: 1000 });
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.deviceSurveysNotFound}, ${error}`);
    }
  };

  useEffect(() => {
    getDevicesWithSelectedSurvey().catch((error) => setError(error));
  }, [survey, devices]);

  /**
   * Get overall answer count
   */
  const overallAnswerCount = () => {
    let count = 0;
    surveyStatistics.forEach((statistic) => {
      count += statistic.totalAnswerCount;
    });

    return count;
  };

  /**
   * get daily average answer count chart
   */
  const getDailyAverageAnswerCount = () => {
    const weekDayAverages = [0, 0, 0, 0, 0, 0, 0];

    for (const surveyStatistic of surveyStatistics) {
      const weekDaysLength = surveyStatistic.averages.weekDays.length;

      for (let weekDayIndex = 0; weekDayIndex < weekDaysLength; weekDayIndex++) {
        weekDayAverages[weekDayIndex] += surveyStatistic.averages.weekDays[weekDayIndex];
      }
    }
    const { labels } = strings.surveyStatistics;
    const dailyChartdata = [
      { label: labels.monday, value: weekDayAverages[0] },
      { label: labels.tuesday, value: weekDayAverages[1] },
      { label: labels.wednesday, value: weekDayAverages[2] },
      { label: labels.thursday, value: weekDayAverages[3] },
      { label: labels.friday, value: weekDayAverages[4] },
      { label: labels.saturday, value: weekDayAverages[5] },
      { label: labels.sunday, value: weekDayAverages[6] }
    ];

    return dailyChartdata;
  };

  /**
   * Get hourly average answer count chart data
   */
  const getHourlyAverageAnswerCount = (): { label: string; value: number }[] => {
    let now = DateTime.now().set({ hour: START_HOUR });
    const hourlyChartData = [];
    while (now.hour < END_HOUR) {
      let average = 0;

      for (let hourIndex = 0; hourIndex < HOUR_GROUPING; hourIndex++) {
        for (const surveyStatistic of surveyStatistics) {
          average += surveyStatistic.averages.hourly[now.toUTC().hour + hourIndex];
        }
      }

      hourlyChartData.push({ label: `${now.hour} - ${now.hour + HOUR_GROUPING}`, value: average });
      now = now.plus({ hours: HOUR_GROUPING });
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
          <Typography variant="h6">{strings.surveyStatistics.noStatistics}</Typography>
        </Stack>
      );
    }
  };

  /**
   * Render statistic page
   *
   * @param question question
   * @returns statistic page
   */
  const renderStatisticPage = (question: SurveyQuestionStatistics) => (
    <StatisticPage
      key={question.pageId}
      question={question}
      pageTitle={getQuestionTitle(question.pageId)}
    />
  );

  /**
   * Renders statistics pages
   */
  const renderStatisticPages = () => {
    if (!surveyStatistics.length) {
      return renderNoContent();
    }

    const pages: { [key: string]: SurveyQuestionStatistics } = {};

    surveyStatistics.forEach((surveyStatistic) => {
      surveyStatistic.questions.forEach((question) => {
        if (!pages[question.pageId]) {
          pages[question.pageId] = {
            pageId: question.pageId,
            options: []
          };
        }

        question.options.forEach((option) => {
          const optionIndex = pages[question.pageId].options.findIndex(
            (item) => item.questionOptionValue === option.questionOptionValue
          );

          if (optionIndex > -1) {
            pages[question.pageId].options[optionIndex].answerCount += option.answerCount;
          } else {
            pages[question.pageId].options.push({ ...option });
          }
        });
      });
    });

    const pageIds = Object.keys(pages);

    return (
      <>
        {pageIds.map((pageId) => {
          return renderStatisticPage(pages[pageId]);
        })}
      </>
    );
  };

  return (
    <>
      <Stack direction="row" flex={1} overflow="hidden">
        <PropertiesPanel width={400}>
          <StatisticDevices
            devices={devicesWithSurvey}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
          />
        </PropertiesPanel>
        <Content gap={2}>
          {surveyStatistics.length > 0 && (
            <OverallStatisticsCharts
              devices={selectedDevices}
              surveyStatistics={surveyStatistics}
              overallAnswerCount={overallAnswerCount()}
              hourlyChartData={getHourlyAverageAnswerCount()}
              dailyChartData={getDailyAverageAnswerCount()}
            />
          )}
          {renderStatisticPages()}
        </Content>
        <PropertiesPanel width={450}>
          <StatisticsInfo survey={survey} overallAnswerCount={overallAnswerCount()} />
        </PropertiesPanel>
      </Stack>
    </>
  );
};

export default SurveyStatistics;
