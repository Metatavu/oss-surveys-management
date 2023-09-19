import { DeviceSurveyQuestionOptionStatistics, PageQuestionType } from "../../generated/client";
import PageUtils from "../../utils/page-utils";
import ChartTooltip from "./chart-tooltip";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
        <YAxis
          type="category"
          // TODO: Will need to update this in the pdfAnswersDistributionChart before merging
          dataKey={({ questionOptionValue }) =>
            PageUtils.getSerializedHTMLInnerHtmlValues(
              questionOptionValue,
              PageQuestionType.SingleSelect
            )
          }
          width={250}
          fontFamily="SBonusText-Medium"
        />
        <Tooltip content={ChartTooltip} />
        <Bar dataKey="answerCount" fill="#00aa46">
          <LabelList dataKey="answerCount" position="right" fontFamily="SBonusText-Medium" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnswersDistributionChart;
