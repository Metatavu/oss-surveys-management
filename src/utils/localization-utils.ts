import { DeviceApprovalStatus, DeviceStatus } from "../generated/client";
import strings from "../localization/strings";

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
