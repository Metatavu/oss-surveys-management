import { CHART_IDS, CHART_STRINGS } from "../constants";
import { DeviceSurveyStatistics, Survey } from "../generated/client";
import strings from "../localization/strings";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

/**
 * Generates pdf download from statistics data
 *
 * @param survey Survey
 * @param deviceSurveyStatistics list of DeviceSurveyStatistics
 */
export const generatePdf = async (
  survey: Survey,
  deviceSurveyStatistics: DeviceSurveyStatistics[]
) => {
  const pdfDocument = new jsPDF();

  const pdfWithSurveyInfo = addSurveyInfoToPdf(pdfDocument, survey);

  const pdfWithTotalAnswerCount = addTotalAnswerCountToPdf(
    pdfWithSurveyInfo,
    deviceSurveyStatistics
  );

  const pdfWithCharts = await addCharts(pdfWithTotalAnswerCount, CHART_IDS);

  pdfWithCharts.save(`${survey.title.replaceAll(" ", "-")}.pdf`);
};

/**
 * Adds survey title info to PDF
 *
 * @param pdfDocument jsPDF
 * @param survey Survey
 */
const addSurveyInfoToPdf = (pdfDocument: jsPDF, survey: Survey) =>
  pdfDocument.text(
    strings.formatString(strings.pdfStatisticsDownload.surveyTitle, survey.title),
    10,
    10
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
 * Appends total answer count to pdfDocument
 *
 * @param pdfDocument jsPDF
 * @param deviceSurveyStatistics list of DeviceSurveyStatistics
 */
const addTotalAnswerCountToPdf = (
  pdfDocument: jsPDF,
  deviceSurveyStatistics: DeviceSurveyStatistics[]
) =>
  pdfDocument.text(
    strings.formatString(
      strings.pdfStatisticsDownload.totalAnswerCount,
      getTotalAnswerCount(deviceSurveyStatistics)
    ) as string,
    10,
    20
  );

// TODO: Causes errors related to accessing the fonts and stylesheets.
/**
 * Adds the answers per display chart to the PDF
 */
const addCharts = async (pdfDocument: jsPDF, ids: string[]) => {
  const pdfWidth = pdfDocument.internal.pageSize.getWidth(); // Get PDF page width
  const pdfHeight = pdfDocument.internal.pageSize.getHeight(); // Get PDF page height
  const margin = 30; // Margin between charts and edges of the PDF page
  let yCoordinate = margin; // Start y-coordinate

  for (const id of ids) {
    const node = document.getElementById(id);

    if (!node) return pdfDocument;

    const response = await toPng(node);

    pdfDocument.text(CHART_STRINGS[id], margin, yCoordinate);

    // Calculate dimensions based on available space
    const availableWidth = pdfWidth - 2 * margin;
    const availableHeight = pdfHeight - yCoordinate - 2 * margin;

    // Calculate the aspect ratio of the chart
    const chartAspectRatio = node.offsetWidth / node.offsetHeight;

    // Calculate dimensions based on the aspect ratio and available space
    let chartWidth = availableWidth;
    let chartHeight = chartWidth / chartAspectRatio;

    // TODO: This reduces chart size, need to have both most popular charts the same size.
    // If the calculated height exceeds the available height, adjust the dimensions
    if (chartHeight > availableHeight) {
      chartHeight = availableHeight;
      chartWidth = chartHeight * chartAspectRatio;
    }

    // Add the chart to the PDF
    pdfDocument.addImage(response, "PNG", margin, yCoordinate + 10, chartWidth, chartHeight);

    // Update the y-coordinate for the next chart
    yCoordinate += chartHeight + 20;
  }

  return pdfDocument;
};
