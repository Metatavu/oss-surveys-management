import { Paper, Stack, Typography } from "@mui/material";
import strings from "../../localization/strings";
import theme from "../../styles/theme";
import { TooltipProps } from "recharts/types/component/Tooltip";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

/**
 * Chart tooltip component
 */
const ChartTooltip = ({ active, label, payload }: TooltipProps<ValueType, string | number>) => {
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
            {strings.formatString(
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
