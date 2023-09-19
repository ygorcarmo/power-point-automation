import "./App.css";
import createPptx from "./PowerPointCreator";

function App() {
  // removed this as it takes too much time
  // function fileurl(file) {
  //   return new Promise((resolve, reject) => {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function () {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = function (error) {
  //       reject(error);
  //     };
  //   });
  // }

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
                // let data = await fileurl(files[i]);
                let data = URL.createObjectURL(files[i]);
                filesData.push({
                  name: fileName.substring(0, fileName.indexOf(".")),
                  url: data,
                });
              }
              await createPptx(filesData, campaignName);
              console.log("finished");

              // free up some space
              for (let n = 0; n < filesData.length; n++) {
                URL.revokeObjectURL(filesData[n].url);
              }
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
