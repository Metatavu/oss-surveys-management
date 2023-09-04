import { Device, DeviceSurveyStatistics } from "../../generated/client";
import strings from "../../localization/strings";
import ChartTooltip from "./chart-tooltip";
import { Typography } from "@mui/material";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyStatistics[];
  devices: Device[];
}

interface ConstructedData {
  deviceName: string;
  answerCount: number;
}

/**
 * Render vertical bar chart
 *
 * @param props component properties
 */
const DeviceDistributionChart = ({ data, devices }: Props) => {
  const constructedData: ConstructedData[] = devices
    .map((device) => ({
      deviceName: device.name ?? strings.generic.unnamed,
      answerCount: data.find((stat) => stat.deviceId === device.id)?.totalAnswerCount || 0
    }))
    .sort((a, b) => b.answerCount - a.answerCount);

  const constructSourcesString = () => {
    const sourcesString =
      strings.surveyStatistics.statisticsSource + devices.map((device) => device.name).join("/");

    return <Typography>{sourcesString}</Typography>;
  };

  const height = constructedData.length * 25 + 50;

  return (
    <>
      <ResponsiveContainer height={height}>
        <BarChart data={constructedData} layout="vertical" margin={{ right: 50 }}>
          <XAxis type="number" fontFamily="SBonusText-Medium" />
          <YAxis type="category" dataKey="deviceName" width={0} fontFamily="SBonusText-Medium" />
          <Tooltip content={ChartTooltip} />
          <Bar dataKey="answerCount" fill="#00aa46" isAnimationActive={false}>
            <LabelList
              dataKey="deviceName"
              position="insideLeft"
              fill="#000"
              fontFamily="SBonusText-Bold"
            />
            <LabelList dataKey="answerCount" position="right" fontFamily="SBonusText-Medium" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {constructSourcesString()}
    </>
  );
};

export default DeviceDistributionChart;
