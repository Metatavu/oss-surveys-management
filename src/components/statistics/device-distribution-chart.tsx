import { Device, DeviceSurveyStatistics } from "../../generated/client";
import strings from "../../localization/strings";
import { Box, Typography } from "@mui/material";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyStatistics[];
  devices: Device[];
}

/**
 * Render vertical bar chart
 *
 * @param props component properties
 */
const DeviceDistributionChart = ({ data, devices }: Props) => {
  let constructedData: any[] = [];
  if (devices) {
    devices.forEach((device) => {
      constructedData?.push({
        deviceName: device.name,
        answerCount: data.find((stat) => stat.deviceId === device.id)?.totalAnswerCount || 0
      });
    });
  }

  const constructSourcesString = () => {
    let sourcesString = strings.surveyStatistics.statisticsSource;
    devices.forEach((device) => (sourcesString += `${device.name}/ `));

    return <Typography>{sourcesString}</Typography>;
  };

  const height = constructedData.length * 25 + 50;

  return (
    <Box style={{ height: height, width: "100%", marginBottom: 50 }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={constructedData} layout="vertical" margin={{ right: 50 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="deviceName" hide />
          <Tooltip />
          <Bar dataKey="answerCount" fill="#00aa46">
            <LabelList dataKey="answerCount" position="right" fill="#000" />
            <LabelList dataKey="deviceName" position="insideBottomLeft" fill="#fff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {constructSourcesString()}
    </Box>
  );
};

export default DeviceDistributionChart;
