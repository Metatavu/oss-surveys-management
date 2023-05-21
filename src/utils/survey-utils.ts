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
      (deviceSurvey) => deviceSurvey.surveyId === surveyId
    );

    if (!foundDeviceSurveys?.length) return;

    const earliestPublishStartTime = Math.min(
      ...foundDeviceSurveys.map(
        (deviceSurvey) =>
          deviceSurvey.publishStartTime?.valueOf() ?? deviceSurvey.metadata?.createdAt.valueOf()
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
}

export default SurveyUtils;
