import config from "../app/config";
import {
  Configuration,
  ConfigurationParameters,
  DeviceRequestsApi,
  DeviceSurveysApi,
  DevicesApi,
  LayoutsApi,
  PagesApi,
  SurveysApi
} from "../generated/client";

type ConfigConstructor<T> = new (_params: ConfigurationParameters) => T;

const getConfigurationFactory =
  <T>(ConfigConstructor: ConfigConstructor<T>, basePath: string, accessToken?: string) =>
  () => {
    return new ConfigConstructor({
      basePath: basePath,
      accessToken: accessToken
    });
  };

export const getApiClient = (accessToken?: string) => {
  const getConfiguration = getConfigurationFactory(Configuration, config.api.baseUrl, accessToken);

  return {
    surveysApi: new SurveysApi(getConfiguration()),
    pagesApi: new PagesApi(getConfiguration()),
    layoutsApi: new LayoutsApi(getConfiguration()),
    deviceSurveysApi: new DeviceSurveysApi(getConfiguration()),
    devicesApi: new DevicesApi(getConfiguration()),
    deviceRequestsApi: new DeviceRequestsApi(getConfiguration())
  };
};
