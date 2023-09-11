import { toPng } from "html-to-image";
import html2canvas from "html2canvas";

/**
 * Returns an image reference of a chart
 *
 * @param id string
 */
export const addChart = async (id: string) => {
  const node = document.getElementById(id);

  if (!node) return;

  const chartImage = await toPng(node);
  // const chartImage = await toPng(node, {
  //   width: 1920,
  //   height: 1080
  // });

  // const canvas = await html2canvas(node);

  // const fixedWidth = 300;
  // const fixedHeight = 200;

  // const resizedCanvas = document.createElement("canvas");
  // resizedCanvas.width = fixedWidth;
  // resizedCanvas.height = fixedHeight;

  // const ctx = resizedCanvas.getContext("2d")!;
  // ctx.drawImage(canvas, 0, 0, fixedWidth, fixedHeight);

  // const chartImage = resizedCanvas.toDataURL("image/png");
  // const chartImage = canvas.toDataURL("image/png");

  return chartImage;
};

// /**
//  * Returns an image reference of a chart at a fixed size
//  *
//  * @param id string
//  */
// export const addChart = async (id: string) => {
//   const node = document.getElementById(id);

//   if (!node) return;

//   const fixedWidth = 300;
//   const fixedHeight = 200;

//   // Capture the chart as a canvas
//   const canvas = await html2canvas(node);

//   // Calculate the aspect ratio of the chart
//   const aspectRatio = canvas.width / canvas.height;

//   // Create a new canvas with the fixed size while preserving the aspect ratio
//   const resizedCanvas = document.createElement("canvas");
//   if (aspectRatio > 1) {
//     resizedCanvas.width = fixedWidth;
//     resizedCanvas.height = fixedWidth / aspectRatio;
//   } else {
//     resizedCanvas.width = fixedHeight * aspectRatio;
//     resizedCanvas.height = fixedHeight;
//   }

//   const ctx = resizedCanvas.getContext("2d")!;

//   // Draw the captured image on the new canvas, centering it if needed
//   const offsetX = (fixedWidth - resizedCanvas.width) / 2;
//   const offsetY = (fixedHeight - resizedCanvas.height) / 2;
//   ctx.drawImage(canvas, offsetX, offsetY, resizedCanvas.width, resizedCanvas.height);

//   // Convert the resized canvas to a data URL
//   const chartImage = resizedCanvas.toDataURL("image/png");

//   return chartImage;
// };
