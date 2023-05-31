import { Device, DeviceStatus, DeviceSurvey } from "../generated/client";

/**
 * Namespace for Device utilities
 */
namespace DeviceUtils {
  /**
   * Gets devices by status
   *
   * @param devices devices
   * @param status status
   * @return amount of devices by status
   */
  export const getDevicesByStatus = (devices: Device[], status: DeviceStatus) =>
    devices.filter((device) => device.deviceStatus === status);

  /**
   * Gets devices without surveys
   *
   * @param devices devices
   * @param deviceSurveys device surveys
   * @returns devices without surveys
   */
  export const getDevicesWithoutSurveys = (devices: Device[], deviceSurveys: DeviceSurvey[]) =>
    devices.filter(
      (device) => !deviceSurveys.find((deviceSurvey) => deviceSurvey.deviceId === device.id)
    );

  /**
   * Gets devices survey count
   *
   * @param device device
   * @param devicesSurveys devices surveys
   * @returns devices survey count
   */
  export const getDeviceSurveyCount = (device: Device, devicesSurveys: DeviceSurvey[]) =>
    devicesSurveys.filter((deviceSurvey) => deviceSurvey.deviceId === device.id).length;
}

export default DeviceUtils;
