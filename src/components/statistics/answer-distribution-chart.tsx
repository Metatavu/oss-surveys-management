import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from "recharts";
import { DeviceSurveyQuestionOptionStatistics } from "../../generated/client";

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
    <ResponsiveContainer height={height}>
      <BarChart data={data} layout="vertical" margin={{ right: 50 }}>
        <XAxis type="number" fontFamily="SBonusText-Medium" />
        <YAxis type="category" dataKey="questionOptionValue" width={250} fontFamily="SBonusText-Medium" />
        <Tooltip />
        <Bar dataKey="answerCount" fill="#00aa46">
          <LabelList dataKey="answerCount" position="right" fontFamily="SBonusText-Medium" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnswersDistributionChart;
