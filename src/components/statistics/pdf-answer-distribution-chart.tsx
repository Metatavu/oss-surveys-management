import { DeviceSurveyQuestionOptionStatistics } from "../../generated/client";
import ChartTooltip from "./chart-tooltip";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyQuestionOptionStatistics[];
  id: string;
  renderPdfCharts: boolean;
}

/**
 * Render hidden vertical bar chart for pdf download
 */
const PdfAnswersDistributionChart = ({ data, id, renderPdfCharts }: Props) => {
  if (!renderPdfCharts) {
    return <></>;
  }

  const height = data.length * 30 + 50;
  const sortedData = data.sort((a, b) => b.answerCount - a.answerCount);

  // Removes line breaks from questionOptionValues otherwise will not render in recharts.
  const sanitizedData = sortedData.map((item) => ({
    ...item,
    questionOptionValue: item.questionOptionValue.replace(/\n/g, "")
  }));

  return (
    <ResponsiveContainer id={id} className="pdf-chart" height={height} width={800}>
      <BarChart data={sanatizedData} layout="vertical" margin={{ right: 50 }}>
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
