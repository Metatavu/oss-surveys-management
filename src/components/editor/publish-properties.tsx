import { Device, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { ArrowUpward, CalendarTodayOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography, TypographyProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { useState } from "react";

/**
 * Components properties
 */
interface Props {
  survey: Survey;
  selectedDevices: Device[];
  publishSurvey: (publishStartTime: DateTime, publishEndTime: DateTime) => Promise<void>;
}

/**
 * Publish properties component
 */
const PublishProperties = ({ survey, selectedDevices, publishSurvey }: Props) => {
  const [newPublishStartTime, setNewPublishStartTime] = useState<DateTime | null>(null);
  const [newPublishEndTime, setNewPublishEndTime] = useState<DateTime | null>(null);
  const defaultPublicationStartTime = DateTime.now().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });
  const defaultPublicationEndTime = DateTime.fromObject({
    year: 3000,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  const {
    heading,
    description,
    devicesCount,
    scheduling,
    publishStartTime,
    publishEndTime,
    publishButton
  } = strings.publishSurveys.rightPanel;

  /**
   * Renders panel label and value
   *
   * @param label label
   * @param value value
   * @param style style
   */
  const renderPanelLabelAndValue = (label: string, value: any, style?: TypographyProps) => (
    <Stack gap={2} p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
      <Typography variant="h6">{label}</Typography>
      <Typography {...style}>{value}</Typography>
    </Stack>
  );

  /**
   * Renders panel label and date picker
   *
   * @param label label
   * @param value value
   * @param onChange onChange
   */
  const renderPanelLabelAndDatePicker = (
    label: string,
    onChange: (value: DateTime | null) => void,
    value?: any
  ) => (
    <>
      <Typography variant="subtitle1">{label}</Typography>
      <DatePicker
        value={value}
        onChange={onChange}
        format="dd.MM.yyyy"
        disablePast
        slots={{
          openPickerIcon: CalendarTodayOutlined
        }}
        slotProps={{
          textField: {
            placeholder: "",
            InputProps: {
              disableUnderline: true,
              sx: {
                "& .MuiInputBase-input": { color: theme.palette.primary.main }
              }
            }
          },
          inputAdornment: { position: "start" },
          openPickerIcon: { color: "primary" }
        }}
      />
    </>
  );

  return (
    <>
      {renderPanelLabelAndValue(heading, survey.title)}
      {renderPanelLabelAndValue(description, survey.description)}
      {renderPanelLabelAndValue(devicesCount, selectedDevices.length, {
        color: "primary",
        fontSize: "2rem",
        fontFamily: "SBonusDisplay-Bold"
      })}
      <Stack gap={2} p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography variant="h6">{scheduling}</Typography>
        {renderPanelLabelAndDatePicker(
          publishStartTime,
          setNewPublishStartTime,
          newPublishStartTime
        )}
        {renderPanelLabelAndDatePicker(publishEndTime, setNewPublishEndTime, newPublishEndTime)}
      </Stack>
      <Box p={3}>
        <Button
          variant="contained"
          fullWidth
          sx={{ justifyContent: "space-between" }}
          startIcon={<ArrowUpward />}
          endIcon={<ArrowUpward sx={{ opacity: 0 }} />}
          title={strings.publishSurveys.rightPanel.activateButtonTitle}
          onClick={() =>
            publishSurvey(
              newPublishStartTime || defaultPublicationStartTime,
              newPublishEndTime || defaultPublicationEndTime
            )
          }
        >
          {publishButton}
        </Button>
      </Box>
    </>
  );
};

export default PublishProperties;
