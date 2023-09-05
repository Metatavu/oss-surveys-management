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
  const { pdfWithCharts, yCoordinate } = await addCharts(pdfWithTotalAnswerCount, CHART_IDS);
  const pdfWithAnswerDistributionTables = addAnswerDistributionTables(
    pdfWithCharts,
    deviceSurveyStatistics,
    getQuestionTitle,
    yCoordinate
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
  const margin = 30;
  let yCoordinate = margin;

  for (const id of ids) {
    const node = document.getElementById(id);
    const pdfWidth = pdfDocument.internal.pageSize.getWidth();
    const pdfHeight = pdfDocument.internal.pageSize.getHeight();

    if (!node)
      return {
        pdfWithCharts: pdfDocument,
        yCoordinate: yCoordinate
      };

    const chartImage = await toPng(node);

    // TODO: The below needs fixing to handle various screen sizes and improve aspect ratio.
    // Calculate dimensions based on available space
    const availableWidth = pdfWidth - 2 * margin;
    const availableHeight = pdfHeight - yCoordinate - 2 * margin;

    // Calculate the aspect ratio of the chart
    const chartAspectRatio = node.offsetWidth / node.offsetHeight;

    // Calculate dimensions based on the aspect ratio and available space
    const maxHeight = 50;
    let chartWidth = availableWidth;
    let chartHeight =
      chartWidth / chartAspectRatio < maxHeight ? chartWidth / chartAspectRatio : maxHeight;

    if (chartHeight > availableHeight) {
      pdfDocument.addPage();
      yCoordinate = 10;
    }

    pdfDocument.text(CHART_STRINGS[id], margin, yCoordinate);

    pdfDocument.addImage(chartImage, "PNG", margin, yCoordinate + 10, chartWidth, chartHeight);
    yCoordinate += chartHeight + 20;
  }

  return {
    pdfWithCharts: pdfDocument,
    yCoordinate: yCoordinate
  };
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
  getQuestionTitle: (pageId: string) => string,
  yCoordinate: number
) => {
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

  let estimatedTableFinalY = yCoordinate;
  const margin = 30;
  const availablePageHeight = pdfDocument.internal.pageSize.getHeight() - margin;

  for (const questionText in questionOptionCounts) {
    const headers = ["Option", "Answer Count"];
    const data = [];

    for (const optionText in questionOptionCounts[questionText]) {
      const answerCount = questionOptionCounts[questionText][optionText];
      data.push([optionText, answerCount]);
    }

    estimatedTableFinalY += data.length * 10;
    if (estimatedTableFinalY > availablePageHeight) {
      pdfDocument.addPage();
      yCoordinate = 10;
      estimatedTableFinalY = 10;
    }

    pdfDocument.text(questionText, 10, yCoordinate);

    (pdfDocument as any).autoTable({
      startY: yCoordinate + 10,
      head: [headers],
      body: data
    });

    yCoordinate = (pdfDocument as any).lastAutoTable.finalY + 10;
  }

  return pdfDocument;
};
