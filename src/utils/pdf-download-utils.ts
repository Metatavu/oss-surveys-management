import { PDF_IMAGE_FACTOR } from "../constants";
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

  const pdfWithAnswersPerDisplay = await addAnswersPerDisplayChart(pdfWithTotalAnswerCount);

  pdfWithAnswersPerDisplay.save(`${survey.title.replaceAll(" ", "-")}.pdf`);
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
const addAnswersPerDisplayChart = async (pdfDocument: jsPDF) => {
  var node = document.getElementById("answers-per-display-chart");

  if (!node) return pdfDocument;

  const response = await toPng(node);

  pdfDocument.text(strings.pdfStatisticsDownload.answersPerDisplay, 10, 30);

  return pdfDocument.addImage(
    response,
    "PNG",
    10,
    40,
    node.offsetWidth / PDF_IMAGE_FACTOR,
    node.offsetHeight / PDF_IMAGE_FACTOR
  );
};
