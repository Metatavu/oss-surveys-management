import html2canvas from "html2canvas";

/**
 * Returns an image reference of a chart
 *
 * @param id string
 */
export const addChart = async (id: string) => {
  const node = document.getElementById(id);

  if (!node) return;

  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  const canvas = await html2canvas(node);
  const chartImage = canvas.toDataURL("image/png");

  return chartImage;
};
