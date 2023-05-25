import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/**
 * Render generic tiny bar chart
 */
const data = [
  { label: 'First', value: 7 },
  { label: 'Second', value: 10 },
];

const GenericChart = () => {
  return (
    <BarChart layout="horizontal" width={300} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#00AA46" label={{ position: 'top' }} />
    </BarChart>
  );
}

export default GenericChart;
