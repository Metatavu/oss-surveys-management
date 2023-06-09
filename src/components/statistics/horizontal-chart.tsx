import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import ChartTooltip from "./chart-tooltip";

/**
 * Component properties
 */
interface Props {
  data: any[];
}

/**
 * Render horizontal bar chart
 *
 * @param props component properties
 */
const HorizontalChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={250}>
      <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="category" dataKey="label" fontFamily="SBonusText-Medium" />
        <Tooltip content={ChartTooltip} />
        <Bar dataKey="value" fill="#00aa46" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalChart;
