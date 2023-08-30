import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { Paper, Stack, Typography } from "@mui/material";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts/types/component/Tooltip";

interface CustomToolTipProps {
  usesPercentage?: boolean;
}

/**
 * Chart tooltip component
 */
const ChartTooltip = ({
  active,
  label,
  payload,
  usesPercentage
}: TooltipProps<ValueType, string | number> & CustomToolTipProps) => {
  /**
   * Gets label value
   *
   * @param value value
   */
  const getLabelValue = (value: string | number | (string | number)[]) => {
    const labelValue = Array.isArray(value) ? value[0] : value;
    if (typeof labelValue === "number") {
      return Math.round((labelValue + Number.EPSILON) * 10) / 10;
    }

    return labelValue;
  };

  if (active && payload && payload.length) {
    return (
      <Paper sx={{ padding: theme.spacing(2) }}>
        <Stack>
          <Typography variant="h6">{label}</Typography>
          <Typography>
            {usesPercentage
              ? strings.formatString(
                  strings.surveyStatistics.labels.percentageCount,
                  getLabelValue(payload[0].value ?? "")
                )
              : strings.formatString(
                  strings.surveyStatistics.labels.answerCount,
                  getLabelValue(payload[0].value ?? "")
                )}
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return null;
};

export default ChartTooltip;
