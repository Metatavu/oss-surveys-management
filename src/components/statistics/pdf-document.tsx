import config from "../../app/config";
import { CHART_STRINGS } from "../../constants";
import { DeviceSurveyStatistics, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import { ChartData, CombinedChartData } from "../../types";
import PageUtils from "../../utils/page-utils";
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const { cdnBaseUrl } = config;

// Register SBonusText-Regular font
Font.register({
  family: "SBonusText-Regular",
  format: "truetype",
  fonts: [
    {
      src: `${cdnBaseUrl}/fonts/SBonusText-Regular.woff`,
      fontWeight: "normal"
    }
  ]
});

// Register SBonusDisplay-Black font
Font.register({
  family: "SBonusDisplay-Black",
  fonts: [
    {
      src: `${cdnBaseUrl}/fonts/SBonusDisplay-Black.woff`,
      fontWeight: "normal"
    }
  ]
});

// Register SBonusText-Bold font
Font.register({
  family: "SBonusText-Bold",
  fonts: [
    {
      src: `${cdnBaseUrl}/fonts/SBonusText-Bold.woff`,
      fontWeight: "normal"
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 32
  },
  section: {
    padding: 8
  },
  answerCountSection: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  multiImageSection: {
    padding: 10,
    flexGrow: 1,
    flexDirection: "row"
  },
  titleText: {
    fontFamily: "SBonusDisplay-Black",
    fontSize: 24
  },
  headerText: {
    fontFamily: "SBonusText-Bold",
    fontSize: 14,
    marginBottom: 16
  },
  regularText: {
    fontFamily: "SBonusText-Regular",
    fontSize: 12,
    marginBottom: 8
  },
  totalAnswersNumber: {
    fontFamily: "SBonusDisplay-Black",
    fontSize: 24,
    fontWeight: "bold",
    color: "#00aa46"
  }
});

/**
 * Component properties
 */
interface Props {
  combinedChartsData?: CombinedChartData;
  surveyStatistics: DeviceSurveyStatistics[];
  survey: Survey;
  getQuestionTitle: (pageId: string) => string;
}

/**
 * Component for PDF document
 *
 * @param props component properties
 */
const PDFDocument = ({ combinedChartsData, surveyStatistics, survey, getQuestionTitle }: Props) => {
  if (!combinedChartsData) return <div />;

  const deviceChart = combinedChartsData.popularTimesAndDeviceCharts[0];
  const popularTimesCharts = combinedChartsData.popularTimesAndDeviceCharts.slice(1);
  const { answerDistributionCharts } = combinedChartsData;

  /**
   * Render survey info
   */
  const renderSurveyInfo = () => <Text style={styles.titleText}>{survey.title}</Text>;

  /**
   * Render total answer count
   */
  const renderTotalAnswerCount = () => (
    <>
      <Text style={styles.headerText}>{strings.pdfStatisticsDownload.totalAnswerCount}</Text>
      <Text style={styles.totalAnswersNumber}>{getTotalAnswerCount(surveyStatistics)}</Text>
    </>
  );

  /**
   * Sum total answer count from selected devices
   *
   * @param deviceSurveyStatistics list of DeviceSurveyStatistics
   * @returns total number
   */
  const getTotalAnswerCount = (deviceSurveyStatistics: DeviceSurveyStatistics[]) => {
    let total = 0;
    for (const stats of deviceSurveyStatistics) {
      total += stats.totalAnswerCount;
    }

    return total;
  };

  /**
   * Render device chart
   *
   * @param data ChartData
   */
  const renderDeviceChart = (data: ChartData) => (
    <View key={data.id} style={styles.section} wrap={false}>
      <Text style={styles.headerText}>{CHART_STRINGS[data.id]}</Text>
      <Image source={data.ref} />
    </View>
  );

  /**
   * Renders popular times charts
   *
   * @param data list of ChartData
   */
  const renderPopularTimesCharts = (data: ChartData[]) => (
    <View style={styles.multiImageSection} wrap={false}>
      {data.map((chartData) => (
        <View key={chartData.id}>
          <Text style={styles.headerText}>{CHART_STRINGS[chartData.id]}</Text>
          <Image source={chartData.ref} />
        </View>
      ))}
    </View>
  );

  /**
   *  Renders answer distribution charts
   *
   * @param data list of ChartData
   */
  const renderAnswerDistributionCharts = (data: ChartData[]) =>
    data.map((chartData) => (
      <View key={chartData.id} style={styles.section} wrap={false}>
        <Text style={styles.headerText}>
          {`${PageUtils.getSerializedHTMLInnerPropertyValues(getQuestionTitle(chartData.id))}`}
        </Text>
        <Image source={chartData.ref} />
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>{renderSurveyInfo()}</View>
        <View style={styles.answerCountSection}>{renderTotalAnswerCount()}</View>
        <View>{renderAnswerDistributionCharts(answerDistributionCharts)}</View>
        <View style={styles.section}>
          {renderPopularTimesCharts(popularTimesCharts)}
          {renderDeviceChart(deviceChart)}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
