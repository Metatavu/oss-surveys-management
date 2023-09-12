import { DeviceSurveyQuestionOptionStatistics } from "../../generated/client";
import ChartTooltip from "./chart-tooltip";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyQuestionOptionStatistics[];
  id: string;
}

/**
 * Render hidden vertical bar chart for pdf download
 */
const PdfAnswersDistributionChart = ({ data, id }: Props) => {
  const height = data.length * 25 + 50;
  const sortedData = data.sort((a, b) => b.answerCount - a.answerCount);

  return (
    <ResponsiveContainer id={id} className="pdf-chart" height={height} width={800}>
      <BarChart data={sortedData} layout="vertical" margin={{ right: 50 }}>
        <XAxis type="number" fontFamily="SBonusText-Medium" />
        <YAxis
          type="category"
          dataKey="questionOptionValue"
          width={250}
          fontFamily="SBonusText-Medium"
        />
        <Tooltip content={ChartTooltip} />
        <Bar dataKey="answerCount" fill="#00aa46" isAnimationActive={false}>
          <LabelList dataKey="answerCount" position="right" fontFamily="SBonusText-Medium" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PdfAnswersDistributionChart;
