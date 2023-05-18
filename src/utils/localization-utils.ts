import { DeviceStatus } from "../generated/client";
import strings from "../localization/strings";
import { SurveyManagementStatus, SurveySortBy } from "../types";

/**
 * Namespace for Localization utilities
 */
namespace LocalizationUtils {
  /**
   * Gets localized device status
   *
   * @param status status
   */
  export const getLocalizedDeviceStatus = (status: DeviceStatus) =>
    ({
      [DeviceStatus.Offline]: strings.devices.status.offline,
      [DeviceStatus.Online]: strings.devices.status.online
    })[status];

  /**
   * Gets localized survey management status
   *
   * @param status status
   */
  export const getLocalizedSurveyManagementStatus = (status: SurveyManagementStatus) =>
    ({
      [SurveyManagementStatus.APPROVED]: strings.surveysScreen.status.readyToPublish,
      [SurveyManagementStatus.DRAFT]: strings.surveysScreen.status.draft,
      [SurveyManagementStatus.PUBLISHED]: strings.surveysScreen.status.published,
      [SurveyManagementStatus.SCHEDULED]: strings.surveysScreen.status.scheduled
    })[status];

  /**
   * Gets localized show options
   *
   * @param status status
   */
  export const getLocalizedShowOptions = (status: SurveyManagementStatus) =>
    ({
      [SurveyManagementStatus.APPROVED]: strings.surveysScreen.filters.showReadyToPublish,
      [SurveyManagementStatus.DRAFT]: strings.surveysScreen.filters.showDrafts,
      [SurveyManagementStatus.PUBLISHED]: strings.surveysScreen.filters.showPublished,
      [SurveyManagementStatus.SCHEDULED]: strings.surveysScreen.filters.showScheduled
    })[status];

  /**
   * Gets localized sort by options
   *
   * @param sortBy sort by
   */
  export const getLocalizedSortByOptions = (sortBy: SurveySortBy) =>
    ({
      [SurveySortBy.NAME]: strings.surveysScreen.filters.sortByTitle,
      [SurveySortBy.STATUS]: strings.surveysScreen.filters.sortByStatus,
      [SurveySortBy.MODIFIED]: strings.surveysScreen.filters.sortByModifiedAt,
      [SurveySortBy.CREATOR]: strings.surveysScreen.filters.sortByCreator,
      [SurveySortBy.PUBLICATION_TIME]: strings.surveysScreen.filters.sortByPublicationDate
    })[sortBy];
}

export default LocalizationUtils;
