import { DeviceSurveyQuestionOptionStatistics } from "../../generated/client";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

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
    <BarChart
      width={1400}
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
  );
}

export default AnswersDistributionChart;
