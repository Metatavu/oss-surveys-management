import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: any[];
}

/**
 * Render horizontal bar chart
 */
const HorizontalChart = ({ data }: Props) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      layout="horizontal"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis type="category" dataKey="label" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#00aa46" />
    </BarChart>
  );
}

export default HorizontalChart;
