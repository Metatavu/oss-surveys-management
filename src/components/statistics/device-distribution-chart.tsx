import { Device, DeviceSurveyStatistics } from "../../generated/client";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyStatistics[];
  devices: Device[];
}

/**
 * Render vertical bar chart
 */
const DeviceDistributionChart = ({ data, devices }: Props) => {
  let constructedData: any[] | undefined = [];
  if (devices) {
    devices.forEach(device => {
      constructedData?.push({
        deviceName: device.name,
        answerCount: data.find(stat => stat.deviceId === device.id)?.totalAnswerCount
      });
    });
  }

  console.log(constructedData)
  return (
    <BarChart
      width={1400}
      height={100}
      data={constructedData}
      layout="vertical"
    >
      <XAxis type="number" />
      <YAxis type="category" dataKey="deviceName" />
      <Tooltip />
      <Legend />
      <Bar dataKey="answerCount" label={{ position: "right" }} fill="#00aa46" />
    </BarChart>
  );
}

export default DeviceDistributionChart;
