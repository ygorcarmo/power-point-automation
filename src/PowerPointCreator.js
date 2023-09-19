import lookLogo from "./assets/Look_Hor_CMYK_300.jpg";
import PptxGenJS from "pptxgenjs";

export default async function createPptx(images, title) {
  console.log("started");
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
    y: 0.06,
    w: 1.25,
    h: 0.25,
    path: lookLogo,
    objectName: "animated gif",
  });

  let slide = pptx.addSlide();
  slide.addImage({
    x: 8.5,
    y: 0.06,
    w: 1.25,
    h: 0.25,
    path: lookLogo,
    objectName: "animated gif",
  });

  let initialXPosition = 1.13;
  let textYPosition = 0.2;
  let imageYPosition = 2;
  let space = 3;
  let nextPosition = 0;
  let imageCount = 0;
  let width = "20%";
  let height = "50%";

  for (let x = 0; x < images.length; x++) {
    if (x == 0 || imageCount == 0) {
      slide.addText(images[x].name, {
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
      slide.addText(images[x].name, {
        x: nextPosition,
        y: textYPosition,
        w: width,
        h: height,
      });

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

    console.log("still going");
  }

  pptx.writeFile({ fileName: `${title}.pptx` });
}
