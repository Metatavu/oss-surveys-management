import { DateTime } from "luxon";
import { DeviceSurvey, DeviceSurveyStatus, Survey, SurveyStatus } from "../generated/client";
import { DataValidation } from "./data-validation";
import { SurveyManagementStatus } from "../types";

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
      (deviceSurvey) =>
        deviceSurvey.surveyId === surveyId &&
        DataValidation.validateValueIsNotUndefinedNorNull(deviceSurvey.publishStartTime)
    );

    if (!foundDeviceSurveys?.length) return;

    const earliestPublishStartTime = Math.min(
      // rome-ignore lint/style/noNonNullAssertion: <DataValidation:validateValueIsNotUndefinedNorNull ensures that there are no nullish values but Rome doesn't recognize it.>
      ...foundDeviceSurveys.map((deviceSurvey) => deviceSurvey.publishStartTime!.valueOf())
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
    const foundDeviceSurvey = deviceSurveys.find(
      (deviceSurvey) => deviceSurvey.surveyId === survey.id
    );

    if (survey.status === SurveyStatus.Draft) {
      return SurveyManagementStatus.DRAFT;
    }
    if (
      !getSurveyDeviceCount(deviceSurveys, survey.id) &&
      survey.status === SurveyStatus.Approved
    ) {
      return SurveyManagementStatus.APPROVED;
    }
    if (
      getSurveyDeviceCount(deviceSurveys, survey.id) === 1 &&
      foundDeviceSurvey?.status === DeviceSurveyStatus.Scheduled
    ) {
      return SurveyManagementStatus.SCHEDULED;
    }

    return SurveyManagementStatus.PUBLISHED;
  };

  /**
   * Sorts surveys by survey management status
   *
   * @param surveyA survey A
   * @param surveyB survey B
   * @param deviceSurveys device surveys
   */
  export const sortSurveysByManagementStatus = (
    surveyA: Survey,
    surveyB: Survey,
    deviceSurveys: DeviceSurvey[]
  ) => {
    const surveyAManagementStatus = getSurveyManagementStatus(surveyA, deviceSurveys);
    const surveyBManagementStatus = getSurveyManagementStatus(surveyB, deviceSurveys);
    // NOTE: WORK IN PROGRESS
    if (
      surveyAManagementStatus === SurveyManagementStatus.PUBLISHED &&
      surveyBManagementStatus !== SurveyManagementStatus.PUBLISHED
    )
      return -1;
    if (surveyAManagementStatus < surveyBManagementStatus) return 1;
    return 0;
  };
}

export default SurveyUtils;
