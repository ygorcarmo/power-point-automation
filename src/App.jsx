import "./App.css";
import PptxGenJS from "pptxgenjs";
import lookLogo from "./assets/Look_Hor_CMYK_300.jpg";

function App() {
  const createPptx = async (images, title) => {
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
    let initialPosition = 1.13;
    let space = 3;
    let nextPosition = 0;
    let imageCount = 0;
    for (let x = 0; x < images.length; x++) {
      if (x == 0 || imageCount == 0) {
        slide.addText(images[x].name, {
          x: initialPosition,
          y: 0.2,
          w: 1.5,
          h: 1.5,
        });

        slide.addImage({
          x: initialPosition,
          y: 2,
          w: 1.5,
          h: 1.5,
          path: images[x].base64,
          objectName: "animated gif",
        });
        nextPosition = initialPosition + space;
        imageCount++;
      } else {
        slide.addText(images[x].name, {
          x: nextPosition,
          y: 0.2,
          w: 1.5,
          h: 1.5,
        });

        slide.addImage({
          x: nextPosition,
          y: 2,
          w: 1.5,
          h: 1.5,
          path: images[x].base64,
          objectName: "animated gif",
        });
        nextPosition = nextPosition + space;
        imageCount++;
      }

      if (imageCount == 3 && x <= images.length - 2) {
        console.log(x);
        imageCount = 0;
        initialPosition = 1.13;
        nextPosition = 0;
        slide = pptx.addSlide();
      }
    }

    pptx.writeFile({ fileName: `${title}.pptx` });
  };

  function fileBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const files = formData.getAll("files");
            const campaignName = formData.get("campaign") ?? "";
            let filesData = [];
            try {
              for (let i = 0; i < files.length; i++) {
                const fileName = files[i].name;
                let data = await fileBase64(files[i]);
                filesData.push({
                  name: fileName.substring(0, fileName.indexOf(".")),
                  base64: data,
                });
              }
              createPptx(filesData, campaignName);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <label htmlFor="campaign">
            Campaign
            <input
              name="campaign"
              id="campaign"
              type="text"
              placeholder="campaign name"
            />
          </label>
          <input type="file" name="files" id="files" multiple />
          <button type="submit">Create Project</button>
        </form>
      </div>
    </>
  );
}

export default App;
