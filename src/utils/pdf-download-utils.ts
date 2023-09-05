import { CHART_IDS, CHART_STRINGS } from "../constants";
import { DeviceSurveyStatistics, Survey } from "../generated/client";
import strings from "../localization/strings";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Generates pdf download from statistics data
 *
 * @param survey Survey
 * @param deviceSurveyStatistics list of DeviceSurveyStatistics
 * @param getQuestionTitle Function to get the title for a question
 */
export const generatePdf = async (
  survey: Survey,
  deviceSurveyStatistics: DeviceSurveyStatistics[],
  getQuestionTitle: (pageId: string) => string
) => {
  const pdfDocument = new jsPDF();

  const pdfWithSurveyInfo = addSurveyInfoToPdf(pdfDocument, survey);
  const pdfWithTotalAnswerCount = addTotalAnswerCountToPdf(
    pdfWithSurveyInfo,
    deviceSurveyStatistics
  );
  const pdfWithCharts = await addCharts(pdfWithTotalAnswerCount, CHART_IDS);
  // Hardcoding a new page here for now
  pdfWithCharts.addPage();
  const pdfWithAnswerDistributionTables = addAnswerDistributionTables(
    pdfWithCharts,
    deviceSurveyStatistics,
    getQuestionTitle
  );

  pdfWithAnswerDistributionTables.save(`${survey.title.replaceAll(" ", "-")}.pdf`);
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
 *
 * @param pdfDocument jsPDF
 * @param ids list of ids
 */
const addCharts = async (pdfDocument: jsPDF, ids: string[]) => {
  const pdfWidth = pdfDocument.internal.pageSize.getWidth();
  const pdfHeight = pdfDocument.internal.pageSize.getHeight();
  const margin = 30;
  let yCoordinate = margin;

  for (const id of ids) {
    const node = document.getElementById(id);

    if (!node) return pdfDocument;

    const chartImage = await toPng(node);

    pdfDocument.text(CHART_STRINGS[id], margin, yCoordinate);

    // TODO: The below needs fixing to handle various screen sizes.
    // Calculate dimensions based on available space
    const availableWidth = pdfWidth - 2 * margin;
    const availableHeight = pdfHeight - yCoordinate - 2 * margin;

    // Calculate the aspect ratio of the chart
    const chartAspectRatio = node.offsetWidth / node.offsetHeight;

    // Calculate dimensions based on the aspect ratio and available space
    let chartWidth = availableWidth;
    let chartHeight = chartWidth / chartAspectRatio;

    // If the calculated height exceeds the available height, adjust the dimensions
    if (chartHeight > availableHeight) {
      chartHeight = availableHeight;
      chartWidth = chartHeight * chartAspectRatio;
    }

    pdfDocument.addImage(chartImage, "PNG", margin, yCoordinate + 10, chartWidth, chartHeight);
    yCoordinate += chartHeight + 20;
  }

  return pdfDocument;
};

// TODO: This is grouping question by name, perhaps should be by id? However question ids are currently undefined or null...
/**
 * Adds answer distrubution tables, answers are accumulated across selected devices
 *
 * @param pdfDocumenet jdPDF
 * @param deviceSurveyStatistics list of DeviceSurveyStatistics
 * @param getQuestionTitle function to get the title of a question
 */
const addAnswerDistributionTables = (
  pdfDocument: jsPDF,
  deviceSurveyStatistics: DeviceSurveyStatistics[],
  getQuestionTitle: (pageId: string) => string
) => {
  let yCoordinate = 10;
  const questionOptionCounts: Record<string, Record<string, number>> = {};

  for (const stats of deviceSurveyStatistics) {
    for (const question of stats.questions) {
      const questionText = getQuestionTitle(question.pageId);

      for (const option of question.options) {
        const optionText = option.questionOptionValue;
        const answerCount = option.answerCount;

        if (!questionOptionCounts[questionText]) {
          questionOptionCounts[questionText] = {};
        }
        if (!questionOptionCounts[questionText][optionText]) {
          questionOptionCounts[questionText][optionText] = 0;
        }

        questionOptionCounts[questionText][optionText] += answerCount;
      }
    }
  }

  for (const questionText in questionOptionCounts) {
    pdfDocument.text(questionText, 10, yCoordinate);

    const headers = ["Option", "Answer Count"];
    const data = [];

    for (const optionText in questionOptionCounts[questionText]) {
      const answerCount = questionOptionCounts[questionText][optionText];
      data.push([optionText, answerCount]);
    }

    (pdfDocument as any).autoTable({
      startY: yCoordinate + 10,
      head: [headers],
      body: data
    });

    yCoordinate = (pdfDocument as any).lastAutoTable.finalY + 10;
  }

  return pdfDocument;
};
