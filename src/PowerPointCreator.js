import lookLogo from "./assets/Look_Hor_CMYK_300.jpg";
import PptxGenJS from "pptxgenjs";

export default async function createPptx(images, title) {
  let pptx = new PptxGenJS();

  let firstSlide = pptx.addSlide();
  firstSlide.addText(title, {
    x: 1,
    y: 2,
    w: "80%",
    h: 1,
    fontSize: 36,
    align: "center",
  });

  firstSlide.addImage({
    x: 8.5,
    y: 0.1,
    w: 1.25,
    h: 0.25,
    path: lookLogo,
    objectName: "animated gif",
  });

  let slide = pptx.addSlide();
  slide.addImage({
    x: 8.5,
    y: 0.1,
    w: 1.25,
    h: 0.25,
    path: lookLogo,
    objectName: "animated gif",
  });

  let initialXPosition = 1.13;
  let textYPosition = 0.1;
  let imageYPosition = 2;
  let space = 3;
  let nextPosition = 0;
  let imageCount = 0;
  let width = "20%";
  let height = "50%";

  let currentLocation = "";
  let nextLocation = "";

  for (let x = 0; x < images.length; x++) {
    let currentFilename = images[x].name.split("-");
    currentLocation = currentFilename[1];
    let nextFilename = "";
    if (x < images.length - 1) {
      nextFilename = images[x + 1].name.split("-");
      nextLocation = nextFilename[1];
    }

    if (currentLocation != nextLocation) {
      slide.addText(currentFilename[0].concat("-", currentFilename[1]), {
        x: initialXPosition,
        y: textYPosition,
        w: width,
        h: height,
      });
      slide.addImage({
        x: initialXPosition,
        y: imageYPosition,
        w: width,
        h: height,
        path: images[x].url,
        objectName: "animated gif",
      });
      imageCount = 0;
      initialXPosition = 1.13;
      nextPosition = 0;
      slide = pptx.addSlide();
      slide.addImage({
        x: 8.5,
        y: 0.06,
        w: 1.25,
        h: 0.25,
        path: lookLogo,
        objectName: "animated gif",
      });
    } else if (currentLocation == nextLocation && imageCount == 0) {
      slide.addText(currentFilename[0].concat("-", currentFilename[1]), {
        x: initialXPosition,
        y: textYPosition,
        w: width,
        h: height,
      });

      slide.addImage({
        x: initialXPosition,
        y: imageYPosition,
        w: width,
        h: height,
        path: images[x].url,
        objectName: "animated gif",
      });
      nextPosition = initialXPosition + space;
      imageCount++;
    } else {
      slide.addImage({
        x: nextPosition,
        y: imageYPosition,
        w: width,
        h: height,
        path: images[x].url,
        objectName: "animated gif",
      });
      nextPosition = nextPosition + space;
      imageCount++;
    }

    if (imageCount == 3 && x <= images.length - 2) {
      imageCount = 0;
      initialXPosition = 1.13;
      nextPosition = 0;
      slide = pptx.addSlide();
      slide.addImage({
        x: 8.5,
        y: 0.06,
        w: 1.25,
        h: 0.25,
        path: lookLogo,
        objectName: "animated gif",
      });
    }
  }

  return await pptx.writeFile({ fileName: `${title}.pptx` });
}
