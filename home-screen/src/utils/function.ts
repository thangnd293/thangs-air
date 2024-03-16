import { images } from "@/components/Images";
import html2canvas, { Options } from "html2canvas";

export const takeScreenShot = (
  node: HTMLElement,
  options: Partial<Options> = {}
) => {
  if (!node) {
    throw new Error("You should provide correct html node.");
  }
  return html2canvas(node, options)
    .then((canvas) => {
      const croppedCanvas = document.createElement("canvas");
      const croppedCanvasContext = croppedCanvas.getContext("2d");
      // init data
      const cropPositionTop = 0;
      const cropPositionLeft = 0;
      const cropWidth = canvas.width;
      const cropHeight = canvas.height;

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;

      croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

      const base64Image = croppedCanvas.toDataURL();

      return base64Image;
    })
    .catch((e) => {
      console.error(e);
      return images.youtubeScreenshot;
    });
};
