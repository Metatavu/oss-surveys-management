import { DeviceSurveyQuestionOptionStatistics } from "../../generated/client";
import { Box } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyQuestionOptionStatistics[];
}

/**
 * Render vertical bar chart
 */
const AnswersDistributionChart = ({ data }: Props) => {
  const height = data.length * 25 + 50;

  return (
    <Box style={{ height: height, width: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ right: 50 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="questionOptionValue" />
          <Tooltip />
          <Bar dataKey="answerCount" label={{ position: "right" }} fill="#00aa46" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnswersDistributionChart;
