import { errorAtom } from "../../atoms/error";
import {
  Device,
  DeviceApprovalStatus,
  DeviceRequest,
  DeviceStatus,
  DeviceSurvey,
  Survey
} from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { OverviewScreenTabs } from "../../types";
import TabPanel from "../surveys/tab-panel";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import DeviceUtils from "../../utils/device-utils";
import OverviewSurveyList from "../overview/overview-surveys-list";
import OverviewDevicesList from "../overview/overview-devices-list";
import { languageAtom } from "../../atoms/language";
import LoaderWrapper from "../generic/loader-wrapper";
import OverviewDeviceRequestsList from "../overview/overview-device-requests-list";

/**
 *  Renders overview screen
 */
const OverviewScreen = () => {
  useAtomValue(languageAtom);
  const [activeTab, setActiveTab] = useState(OverviewScreenTabs.ACTIVE);
  const { surveysApi, deviceSurveysApi, devicesApi, deviceRequestsApi } = useApi();
  const setError = useSetAtom(errorAtom);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceSurveys, setDeviceSurveys] = useState<DeviceSurvey[]>([]);
  const [deviceRequests, setDeviceRequests] = useState<DeviceRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Gets Surveys
   */
  const getSurveys = async () => {
    try {
      const surveys = await surveysApi.listSurveys({});
      setSurveys(surveys);
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.surveysNotFound}, ${error}`);
    }
  };

  /**
   * Gets Devices
   */
  const getDevices = async () => {
    const devices = await devicesApi.listDevices({});
    setDevices(devices);

    for (const device of devices) {
      if (!device.id) continue;
      await getDeviceSurveysByDevice(device.id);
    }
  };

  /**
   * Gets Device Surveys for a specific device
   *
   * Device Surveys define what surveys are assigned to what devices.
   *
   * @param deviceId device id
   */
  const getDeviceSurveysByDevice = async (deviceId: string) => {
    try {
      const deviceSurveys = await deviceSurveysApi.listDeviceSurveys({ deviceId: deviceId });
      setDeviceSurveys([...deviceSurveys, ...deviceSurveys]);
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.deviceSurveysNotFound}, ${error}`);
    }
  };

  /**
   * Gets Device Requests
   *
   * Device Requests are Devices that are yet to be approved into the system.
   */
  const getDeviceRequests = async () => {
    try {
      const deviceRequests = await deviceRequestsApi.listDeviceRequests({});
      setDeviceRequests(deviceRequests);
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.deviceRequestsNotFound}, ${error}`);
    }
  };

  /**
   * Handles device overview action button click
   * TODO: Add actual functionality once backend is ready
   *
   * @param _ device
   */
  const handleActionButtonClick = async (_: Device) => alert(strings.generic.notImplemented);

  /**
   * Handles device request approve button click
   *
   * @param deviceRequest device request
   */
  const handleApproveDevice = async (deviceRequest: DeviceRequest) => {
    if (!deviceRequest?.id) return;

    try {
      setIsLoading(true);
      await deviceRequestsApi.updateDeviceRequest({
        requestId: deviceRequest.id,
        deviceRequest: { ...deviceRequest, approvalStatus: DeviceApprovalStatus.Approved }
      });

      setDeviceRequests(deviceRequests.filter((request) => request.id !== deviceRequest.id));
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.deviceRequestUpdateError}, ${error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getSurveys();
    getDevices().catch((error) =>
      setError(`${strings.errorHandling.overviewScreen.devicesNotFound}, ${error}`)
    );
    getDeviceRequests().catch((error) =>
      setError(`${strings.errorHandling.overviewScreen.deviceRequestsNotFound}, ${error}`)
    );
    setIsLoading(false);
  }, []);

  return (
    <LoaderWrapper loading={isLoading}>
      <Box p={4}>
        <Paper>
          <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
            <Tab
              value={OverviewScreenTabs.ACTIVE}
              label={strings.formatString(strings.overviewScreen.activeSurveysTab, surveys.length)}
            />
            <Tab
              value={OverviewScreenTabs.IDLE_DEVICES}
              label={strings.formatString(
                strings.overviewScreen.idleDevicesTab,
                DeviceUtils.getDevicesWithoutSurveys(devices, deviceSurveys).length
              )}
            />
            <Tab
              value={OverviewScreenTabs.OFFLINE_DEVICES}
              label={strings.formatString(
                strings.overviewScreen.offlineDevicesTab,
                DeviceUtils.getDevicesByStatus(devices, DeviceStatus.Offline).length
              )}
            />
            <Tab
              value={OverviewScreenTabs.NEW_DEVICES}
              label={strings.formatString(
                strings.overviewScreen.newDevicesTab,
                deviceRequests.length
              )}
            />
          </Tabs>
          <TabPanel value={activeTab} index={OverviewScreenTabs.ACTIVE}>
            <OverviewSurveyList surveys={surveys} deviceSurveys={deviceSurveys} />
          </TabPanel>
          <TabPanel value={activeTab} index={OverviewScreenTabs.IDLE_DEVICES}>
            <OverviewDevicesList
              devices={DeviceUtils.getDevicesWithoutSurveys(devices, deviceSurveys)}
              actionButtonText={strings.overviewScreen.devices.idleActionButton}
              onClick={handleActionButtonClick}
            />
          </TabPanel>
          <TabPanel value={activeTab} index={OverviewScreenTabs.OFFLINE_DEVICES}>
            <OverviewDevicesList
              devices={DeviceUtils.getDevicesByStatus(devices, DeviceStatus.Offline)}
              actionButtonText={strings.overviewScreen.devices.oflineActionButton}
              onClick={handleActionButtonClick}
            />
          </TabPanel>
          <TabPanel value={activeTab} index={OverviewScreenTabs.NEW_DEVICES}>
            <OverviewDeviceRequestsList
              deviceRequests={deviceRequests}
              actionButtonText={strings.overviewScreen.deviceRequests.actionButton}
              onClick={handleApproveDevice}
            />
          </TabPanel>
        </Paper>
      </Box>
    </LoaderWrapper>
  );
};

export default OverviewScreen;
