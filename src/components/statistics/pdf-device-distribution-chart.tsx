import { Device, DeviceSurveyStatistics } from "../../generated/client";
import strings from "../../localization/strings";
import ChartTooltip from "./chart-tooltip";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Component properties
 */
interface Props {
  data: DeviceSurveyStatistics[];
  devices: Device[];
  toRender?: Boolean;
}

interface ConstructedData {
  deviceName: string;
  answerCount: number;
}

/**
 * Render hidden vertical bar chart for pdf download
 *
 * @param props component properties
 */
const PdfDeviceDistributionChart = ({ data, devices }: Props) => {
  const constructedData: ConstructedData[] = devices
    .map((device) => ({
      deviceName: device.name ?? strings.generic.unnamed,
      answerCount: data.find((stat) => stat.deviceId === device.id)?.totalAnswerCount || 0
    }))
    .sort((a, b) => b.answerCount - a.answerCount);

  const height = constructedData.length * 25 + 50;

  return (
    <>
      <ResponsiveContainer
        id="answers-per-display-chart"
        className="pdf-chart"
        height={height}
        width={800}
      >
        <BarChart data={constructedData} layout="vertical" margin={{ right: 50 }}>
          <XAxis type="number" fontFamily="SBonusText-Medium" />
          <YAxis type="category" dataKey="deviceName" width={250} fontFamily="SBonusText-Medium" />
          <Tooltip content={ChartTooltip} />
          <Bar dataKey="answerCount" fill="#00aa46" isAnimationActive={false}>
            <LabelList dataKey="answerCount" position="right" fontFamily="SBonusText-Medium" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PdfDeviceDistributionChart;
