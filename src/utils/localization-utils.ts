import { DeviceApprovalStatus, DeviceStatus } from "../generated/client";
import strings from "../localization/strings";
import { SurveyManagementStatus } from "../types";

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
   * Gets localized device approval status
   *
   * @param status status
   */
  export const getLocalizedDeviceApprovalStatus = (status: DeviceApprovalStatus) =>
    ({
      [DeviceApprovalStatus.Pending]: strings.overviewScreen.deviceRequests.pendingStatus,
      [DeviceApprovalStatus.Approved]: strings.overviewScreen.deviceRequests.approvedStatus
    })[status];
}

export default LocalizationUtils;
