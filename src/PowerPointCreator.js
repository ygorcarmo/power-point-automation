import lookLogo from "./assets/Look_Hor_CMYK_300.jpg";
import PptxGenJS from "pptxgenjs";

const slideWidth = 10;

const lookLogoProps = {
  x: 7.5,
  y: 0.2,
  w: 2,
  h: 0.25,
  path: lookLogo,
  objectName: "Look Logo",
};

const locationTitleProps = {
  x: 1.13,
  y: 0.1,
  w: "50%",
  h: "20%",
};

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

  firstSlide.addImage(lookLogoProps);

  let slide = pptx.addSlide();
  slide.addImage(lookLogoProps);

  let initialXPosition = 1.13;
  let imageYPosition = 2;
  let space = 3;
  let nextPosition = 0;
  let imageCount = 0;
  let imageWidth = "20%";
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

    if (currentLocation != nextLocation && imageCount == 0) {
      slide.addText(
        currentFilename[0].concat("-", currentFilename[1]),
        locationTitleProps
      );
      slide.addImage({
        w: 4,
        h: height,
        y: imageYPosition,
        x: (slideWidth - 4) / 2,
        path: images[x].url,
        objectName: currentFilename[1],
      });
      imageCount = 0;
      initialXPosition = 1.13;
      nextPosition = 0;
      slide = pptx.addSlide();
      slide.addImage(lookLogoProps);
    } else if (currentLocation == nextLocation && imageCount == 0) {
      slide.addText(
        currentFilename[0].concat("-", currentFilename[1]),
        locationTitleProps
      );

      slide.addImage({
        x: initialXPosition,
        y: imageYPosition,
        w: imageWidth,
        h: height,
        path: images[x].url,
        objectName: currentFilename[1],
      });
      nextPosition = initialXPosition + space;
      imageCount++;
    } else {
      slide.addImage({
        x: nextPosition,
        y: imageYPosition,
        w: imageWidth,
        h: height,
        path: images[x].url,
        objectName: currentFilename[1],
      });
      nextPosition = nextPosition + space;
      imageCount++;
    }

    if (imageCount == 3 && x <= images.length - 2) {
      imageCount = 0;
      initialXPosition = 1.13;
      nextPosition = 0;
      slide = pptx.addSlide();
      slide.addImage(lookLogoProps);
    }
  }

  return await pptx.writeFile({ fileName: `${title}.pptx` });
}
