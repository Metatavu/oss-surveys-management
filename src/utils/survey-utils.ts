import {
  Device,
  DeviceSurvey,
  DeviceSurveyStatistics,
  DeviceSurveyStatus,
  Survey,
  SurveyStatus
} from "../generated/client";
import { StatisticsGroupedBySurvey, SurveyManagementStatus } from "../types";
import { DataValidation } from "./data-validation";
import { DateTime } from "luxon";

/**
 * Namespace for Survey utilities
 */
namespace SurveyUtils {
  /**
   * Gets Surveys earliest publication date
   *
   * @param surveyId survey id
   * @param deviceSurveys device surveys
   * @returns publication date
   */
  export const getEarliestSurveyPublicationDate = (
    deviceSurveys: DeviceSurvey[],
    surveyId?: string
  ) => {
    if (!surveyId) return;
    const foundDeviceSurveys = deviceSurveys.filter(
      (deviceSurvey) => deviceSurvey.surveyId === surveyId
    );

    if (!foundDeviceSurveys?.length) return;

    const earliestPublishStartTime = Math.min(
      ...foundDeviceSurveys
        .filter((deviceSurvey) =>
          DataValidation.validateValueIsNotUndefinedNorNull(deviceSurvey.metadata?.createdAt)
        )
        .map(
          (deviceSurvey) =>
            deviceSurvey.publishStartTime?.valueOf() ?? deviceSurvey.metadata!.createdAt!.valueOf()
        )
    );

    return DateTime.fromMillis(earliestPublishStartTime).toFormat("dd.MM.yyyy");
  };

  /**
   * Gets Surveys latest publication end date
   *
   * @param surveyId survey id
   * @param deviceSurveys device surveys
   * @returns publication end date
   */
  export const getLatestSurveyPublicationEndDate = (
    deviceSurveys: DeviceSurvey[],
    surveyId?: string
  ) => {
    if (!surveyId) return;
    const foundDeviceSurveys = deviceSurveys.filter(
      (deviceSurvey) =>
        deviceSurvey.surveyId === surveyId &&
        DataValidation.validateValueIsNotUndefinedNorNull(deviceSurvey.publishStartTime)
    );

    if (!foundDeviceSurveys?.length) return;

    const latestPublishEndTime = Math.max(
      // rome-ignore lint/style/noNonNullAssertion: <DataValidation:validateValueIsNotUndefinedNorNull ensures that there are no nullish values but Rome doesn't recognize it.>
      ...foundDeviceSurveys.map((deviceSurvey) => deviceSurvey.publishStartTime!.valueOf())
    );

    return DateTime.fromMillis(latestPublishEndTime).toFormat("dd.MM.yyyy");
  };

  /**
   * Gets amount of devices that Survey is published to
   *
   * @param surveyId survey id
   * @param deviceSurveys device surveys
   * @returns amount of devices
   */
  export const getSurveyDeviceCount = (deviceSurveys: DeviceSurvey[], surveyId?: string) => {
    if (!surveyId) return;

    const foundDeviceSurveys = Array.from(
      new Set(deviceSurveys.filter((deviceSurvey) => deviceSurvey.surveyId === surveyId))
    );

    return foundDeviceSurveys.length;
  };

  /**
   * Gets management status of survey
   *
   * @param survey survey
   * @param deviceSurveys device surveys
   * @returns management status
   */
  export const getSurveyManagementStatus = (survey: Survey, deviceSurveys: DeviceSurvey[]) => {
    const foundDeviceSurveys = deviceSurveys.filter(
      (deviceSurvey) => deviceSurvey.surveyId === survey.id
    );

    if (foundDeviceSurveys.length) {
      if (
        foundDeviceSurveys.some(
          (deviceSurvey) => deviceSurvey.status === DeviceSurveyStatus.Published
        )
      )
        return SurveyManagementStatus.PUBLISHED;
      if (
        foundDeviceSurveys.some(
          (deviceSurvey) => deviceSurvey.status === DeviceSurveyStatus.Scheduled
        )
      )
        return SurveyManagementStatus.SCHEDULED;
    }
    if (survey.status === SurveyStatus.Approved) return SurveyManagementStatus.APPROVED;

    return SurveyManagementStatus.DRAFT;
  };

  /**
   * Gets device with highest amount of answers for survey
   *
   * @param devices devices
   * @param statistics statistics
   * @returns device with highest amount of answers
   */
  export const getDeviceWithHighestAmountOfAnswers = (
    devices: Device[],
    statistics: DeviceSurveyStatistics[]
  ) => {
    let highestTotalAnswerCount = 0;
    let deviceWithMostAnswers: string;

    for (const statistic of statistics) {
      if (statistic.totalAnswerCount > highestTotalAnswerCount) {
        highestTotalAnswerCount = statistic.totalAnswerCount;
        deviceWithMostAnswers = statistic.deviceId;
      }
    }

    return devices.find((device) => device.id === deviceWithMostAnswers);
  };

  /**
   * Gets survey total answer count
   *
   * @param surveyId survey id
   * @param groupedStatistics grouped statistics
   * @returns total answer count
   */
  export const getSurveyTotalAnswerCount = (
    surveyId: string,
    groupedStatistics: StatisticsGroupedBySurvey
  ): number => {
    return groupedStatistics[surveyId].reduce(
      (a: number, b: DeviceSurveyStatistics) => a + b.totalAnswerCount,
      0
    );
  };

  /**
   * Groups statistics by survey
   *
   * @param statistics statistics
   * @returns statistics grouped by survey
   */
  export const groupStatisticsBySurvey = (
    statistics: DeviceSurveyStatistics[]
  ): StatisticsGroupedBySurvey => {
    return statistics.reduce((result: any, obj: DeviceSurveyStatistics) => {
      const surveyId = obj.surveyId;
      if (!result[surveyId as keyof typeof result]) {
        result[surveyId as keyof typeof result] = [];
      }
      result[surveyId as keyof typeof result].push(obj);
      return result;
    }, {});
  };
}

export default SurveyUtils;
