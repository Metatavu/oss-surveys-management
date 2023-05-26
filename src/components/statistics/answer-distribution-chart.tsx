import { DeviceSurveyQuestionOptionStatistics } from "../../generated/client";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        height={300}
        data={data}
        layout="vertical"
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="questionOptionValue" />
        <Tooltip />
        <Legend />
        <Bar dataKey="answerCount" label={{ position: "right" }} fill="#00aa46" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AnswersDistributionChart;
