import { CHART_STRINGS } from "../../constants";
import { DeviceSurveyStatistics, Survey } from "../../generated/client";
import strings from "../../localization/strings";
import { ChartData, CombinedChartData } from "../../types";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10
  },
  multiImageSection: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: "row"
  }
});

/**
 * Component properties
 */
interface Props {
  combinedChartsData: CombinedChartData;
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
  const deviceChart = combinedChartsData.popularTimesAndDeviceCharts[0];
  const popularTimesCharts = combinedChartsData.popularTimesAndDeviceCharts.slice(1);
  const { answerDistributionCharts } = combinedChartsData;

  /**
   * Render survey info
   */
  const renderSurveyInfo = () => (
    <Text>{strings.formatString(strings.pdfStatisticsDownload.surveyTitle, survey.title)}</Text>
  );

  /**
   * Render total answer count
   */
  const renderTotalAnswerCount = () => (
    <Text>
      {strings.formatString(
        strings.pdfStatisticsDownload.totalAnswerCount,
        getTotalAnswerCount(surveyStatistics)
      )}
    </Text>
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

  // TODO: Rendering charts seemst to cause errors related to accessing the fonts and stylesheets.
  /**
   * Render device chart
   *
   * @param data ChartData
   */
  const renderDeviceChart = (data: ChartData) => (
    <View key={data.id} style={styles.section} wrap={false}>
      <Text>{CHART_STRINGS[data.id]}</Text>
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
          <Text>{CHART_STRINGS[chartData.id]}</Text>
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
        <Text>{getQuestionTitle(chartData.id)}</Text>
        <Image source={chartData.ref} />
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>{renderSurveyInfo()}</View>
        <View style={styles.section}>{renderTotalAnswerCount()}</View>
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
