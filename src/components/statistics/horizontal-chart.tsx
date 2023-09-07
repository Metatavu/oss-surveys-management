import ChartTooltip from "./chart-tooltip";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: any[];
  usesPercentage?: boolean;
  id: string;
}

/**
 * Render horizontal bar chart
 *
 * @param props component properties
 */
const HorizontalChart = ({ data, usesPercentage, id }: Props) => {
  return (
    <ResponsiveContainer id={id} height={250}>
      <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="category" dataKey="label" fontFamily="SBonusText-Medium" />
        <Tooltip content={(props) => <ChartTooltip {...props} usesPercentage={usesPercentage} />} />
        <Bar dataKey="value" fill="#00aa46" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalChart;
