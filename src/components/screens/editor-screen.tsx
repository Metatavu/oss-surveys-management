import { errorAtom } from "../../atoms/error";
import { Device, DeviceSurvey, Survey } from "../../generated/client";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { SurveyScreenMode } from "../../types";
import EditSurvey from "../editor/edit-survey";
import PublishSurvey from "../editor/publish-survey";
import LoaderWrapper from "../generic/loader-wrapper";
import Toolbar from "../layout-components/toolbar";
import SurveyStatistics from "../statistics/survey-statistics";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Editor screen component
 */
const EditorScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { surveysApi, devicesApi, deviceSurveysApi } = useApi();
  const setError = useSetAtom(errorAtom);

  const [survey, setSurvey] = useState<Survey>();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<SurveyScreenMode>(SurveyScreenMode.EDITOR);
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceSurveys, setDeviceSurveys] = useState<DeviceSurvey[]>([]);

  /**
   * Get Survey from route id
   */
  const getSurvey = async () => {
    if (!id) return;

    const survey = await surveysApi.findSurvey({ surveyId: id });
    setSurvey(survey);
  };

  /**
   * Gets devices
   */
  const getDevices = async () => {
    const devices = await devicesApi.listDevices();
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
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getSurvey().catch((error) =>
      setError(`${strings.errorHandling.editSurveysScreen.surveyNotFound}, ${error}`)
    );
    getDevices().catch((error) =>
      setError(`${strings.errorHandling.overviewScreen.devicesNotFound}, ${error}`)
    );
  }, [id]);

  /**
   * Saves changes to Survey
   *
   * @param surveyId survey id
   * @param survey survey
   */
  const saveSurvey = async (surveyId: string, survey: Survey) => {
    try {
      await surveysApi.updateSurvey({ surveyId: surveyId, survey: survey });
      setSurvey(survey);
      toast.success(strings.editSurveysScreen.surveySaved);
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.surveyNotSaved}, ${error}`);
    }
  };

  /**
   * Publishes survey to devices
   *
   * @param deviceSurveys device surveys
   */
  const publishSurveys = async (deviceSurveys: DeviceSurvey[]) => {
    setIsLoading(true);
    try {
      for (const deviceSurvey of deviceSurveys) {
        await deviceSurveysApi.createDeviceSurvey({
          deviceId: deviceSurvey.deviceId,
          deviceSurvey: deviceSurvey
        });
      }
      toast.success(strings.publishSurveys.surveyPublished);
      navigate("/overview");
    } catch (error: any) {
      setError(`${strings.errorHandling.editSurveysScreen.surveyNotPublished}, ${error}`);
    }
    setIsLoading(false);
  };

  /**
   * Renders screen content according to mode
   */
  const renderContent = () => {
    if (!survey) {
      return null;
    }

    if (mode === SurveyScreenMode.EDITOR) {
      return <EditSurvey survey={survey!} saveSurvey={saveSurvey} />;
    }

    if (mode === SurveyScreenMode.PUBLISH) {
      return (
        <PublishSurvey
          survey={survey}
          devices={devices}
          deviceSurveys={deviceSurveys}
          publishSurveys={publishSurveys}
        />
      );
    }

    if (mode === SurveyScreenMode.STATISTICS) {
      return <SurveyStatistics survey={survey} devices={devices} deviceSurveys={deviceSurveys} />;
    };
  }

  return (
    <>
      <Toolbar survey={survey} mode={mode} setMode={setMode} />
      <LoaderWrapper loading={isLoading}>{renderContent()}</LoaderWrapper>
    </>
  );
};

export default EditorScreen;