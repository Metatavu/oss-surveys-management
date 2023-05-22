import { errorAtom } from "../../atoms/error";
import { useApi } from "../../hooks/use-api";
import strings from "../../localization/strings";
import { Stack } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { DeviceSurvey, Survey, SurveyStatus } from "../../generated/client";
import { languageAtom } from "../../atoms/language";
import { useEffect, useState } from "react";
import SurveysFilters from "../surveys/surveys-filters";
import SurveysList from "../surveys/surveys-list";

/**
 * Renders surveys screen
 */
const SurveysScreen = () => {
  useAtomValue(languageAtom);
  const { surveysApi, devicesApi, deviceSurveysApi } = useApi();

  const setError = useSetAtom(errorAtom);
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>([]);
  const [deviceSurveys, setDeviceSurveys] = useState<DeviceSurvey[]>([]);

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
   * Gets Device Surveys
   */
  const getDeviceSurveys = async () => {
    try {
      const devices = await devicesApi.listDevices({});
      for (const device of devices) {
        if (!device.id) continue;
        const deviceSurveys = await deviceSurveysApi.listDeviceSurveys({ deviceId: device.id });
        setDeviceSurveys([...deviceSurveys, ...deviceSurveys]);
      }
    } catch (error: any) {
      setError(`${strings.errorHandling.overviewScreen.deviceSurveysNotFound}, ${error}`);
    }
  };

  useEffect(() => {
    getSurveys().catch((error) =>
      setError(`${strings.errorHandling.overviewScreen.surveysNotFound}, ${error}`)
    );
    getDeviceSurveys().catch((error) =>
      setError(`${strings.errorHandling.surveysScreen.devicesNotFound}, ${error}`)
    );
  }, []);

  useEffect(() => {
    setFilteredSurveys(surveys);
  }, [surveys]);

  /**
   * Creates a new survey
   */
  const createSurvey = async () => {
    try {
      const newSurvey = await surveysApi.createSurvey({
        survey: {
          title: strings.surveysScreen.newSurvey,
          status: SurveyStatus.Draft,
          timeout: 60
        }
      });

      navigate(`edit/${newSurvey.id}`);
    } catch (error: any) {
      setError(`${strings.errorHandling.surveysScreen.createSurveyError}, ${error}`);
    }
  };

  return (
    <Stack gap={1}>
      <SurveysFilters
        surveys={surveys}
        setFilteredSurveys={setFilteredSurveys}
        createSurvey={createSurvey}
      />
      <SurveysList surveys={filteredSurveys} deviceSurveys={deviceSurveys} />
    </Stack>
  );
};

export default SurveysScreen;
