import { toPng } from "html-to-image";

/**
 * Returns an image reference of a chart
 *
 * @param id string
 */
export const addChart = async (id: string) => {
  const node = document.getElementById(id);

  if (!node) return;

  const chartImage = await toPng(node);
  return chartImage;
};
