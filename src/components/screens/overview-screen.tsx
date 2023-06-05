import { errorAtom } from "../../atoms/error";
import { languageAtom } from "../../atoms/language";
import {
  Device,
  DeviceApprovalStatus,
  DeviceRequest,
  DeviceStatus,
  DeviceSurvey,
  DeviceSurveyStatistics,
  Survey
} from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { OverviewScreenTabs, StatisticsGroupedBySurvey } from "../../types";
import DeviceUtils from "../../utils/device-utils";
import SurveyUtils from "../../utils/survey-utils";
import LoaderWrapper from "../generic/loader-wrapper";
import OverviewDeviceRequestsList from "../overview/overview-device-requests-list";
import OverviewDevicesList from "../overview/overview-devices-list";
import OverviewSurveyList from "../overview/overview-surveys-list";
import TabPanel from "../overview/tab-panel";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

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
  const [activeSurveys, setActiveSurveys] = useState<Survey[]>([]);
  const [groupedStatistics, setGroupedStatistics] = useState<StatisticsGroupedBySurvey>({});

  /**
   * Gets Devices
   */
  const loadDevices = async () => {
    const devices = await devicesApi.listDevices({});
    const foundDeviceSurveys = await Promise.allSettled(
      devices.map((device) => {
        if (!device.id) return Promise.reject();

        return deviceSurveysApi.listDeviceSurveys({ deviceId: device.id });
      })
    );

    const resolvedDeviceSurveys = foundDeviceSurveys.reduce<DeviceSurvey[]>(
      (allDeviceSurveys, deviceSurveys) => {
        if (deviceSurveys.status === "fulfilled") {
          allDeviceSurveys.push(...deviceSurveys.value);
        }

        return allDeviceSurveys;
      },
      []
    );

    const foundStatistics = await Promise.allSettled(
      resolvedDeviceSurveys.map((deviceSurvey) => {
        if (!deviceSurvey.id) return Promise.reject();

        return deviceSurveysApi.getDeviceSurveyStatistics({
          deviceId: deviceSurvey.deviceId,
          surveyId: deviceSurvey.surveyId!
        });
      })
    );

    const resolvedStatistics = foundStatistics.reduce<DeviceSurveyStatistics[]>(
      (allStatistics, statistics) => {
        if (statistics.status === "fulfilled") {
          allStatistics.push(statistics.value);
        }

        return allStatistics;
      },
      []
    );

    const grouped = SurveyUtils.groupStatisticsBySurvey(resolvedStatistics);

    setGroupedStatistics(grouped);
    setDevices(devices);
    setDeviceSurveys(resolvedDeviceSurveys);
  };

  /**
   * Gets active surveys and sets them in state
   */
  useEffect(() => {
    const activeSurveys = surveys.filter((survey) =>
      deviceSurveys.some((deviceSurvey) => deviceSurvey.surveyId === survey.id)
    );
    setActiveSurveys(activeSurveys);
  }, [surveys, deviceSurveys]);

  /**
   * Handles device overview action button click
   * TODO: Add actual functionality once backend is ready
   *
   * @param _ device
   */
  const handleActionButtonClick = async (_: Device) => alert(strings.generic.notImplemented);

  // TODO: Probelm with wrong device id to API should be from here
  /**
   * Handles device request approve button click
   *
   * @param deviceRequest device request
   */
  const handleApproveDevice = async (deviceRequest: DeviceRequest) => {
    if (!deviceRequest?.id) return;

    console.log("Approve device request", deviceRequest);

    // try {
    //   setIsLoading(true);
    //   const updatedDeviceRequest = await deviceRequestsApi.updateDeviceRequest({
    //     requestId: deviceRequest.id,
    //     deviceRequest: { ...deviceRequest, approvalStatus: DeviceApprovalStatus.Approved }
    //   });

    //   setDeviceRequests([
    //     ...deviceRequests.filter((request) => request.id !== deviceRequest.id),
    //     updatedDeviceRequest
    //   ]);
    // } catch (error: any) {
    //   setError(`${strings.errorHandling.overviewScreen.deviceRequestUpdateError}, ${error}`);
    // }
    setIsLoading(false);
  };

  /**
   * Load all data for screen
   */
  const loadData = async () => {
    setSurveys(await surveysApi.listSurveys());
    await loadDevices();
    setDeviceRequests(await deviceRequestsApi.listDeviceRequests());
  };

  useEffect(() => {
    setIsLoading(true);
    loadData().catch((error) => setError(error));
    setIsLoading(false);
  }, []);

  return (
    <LoaderWrapper loading={isLoading}>
      <Box p={4}>
        <Paper>
          <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
            <Tab
              value={OverviewScreenTabs.ACTIVE}
              label={strings.formatString(
                strings.overviewScreen.activeSurveysTab,
                activeSurveys.length
              )}
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
            <OverviewSurveyList
              surveys={activeSurveys}
              deviceSurveys={deviceSurveys}
              groupedStatistics={groupedStatistics}
              devices={devices}
            />
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
