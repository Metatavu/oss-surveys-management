import { Box } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

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
    <Box style={{ height: 250, width: "100%" }}>
      {/* TODO: Width should be responsive, 100% not currently working */}
      <ResponsiveContainer width="100%" height={250} minWidth={350}>
        <BarChart
          width={600}
          height={300}
          data={data}
          layout="horizontal"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="category" dataKey="label" />
          <Tooltip />
          <Bar dataKey="value" fill="#00aa46" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HorizontalChart;
