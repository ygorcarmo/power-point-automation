import { useState } from "react";
import "./App.css";
import createPptx from "./PowerPointCreator";

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else
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
              for (let i = 0; i < files.length; i++) {
                const fileName = files[i].name;
                let data = URL.createObjectURL(files[i]);
                filesData.push({
                  name: fileName.substring(0, fileName.indexOf(".")),
                  url: data,
                });
              }
              try {
                setLoading(true);
                await createPptx(filesData, campaignName);
                console.log("finished");
                setLoading(false);

                // free up some space
                for (let n = 0; n < filesData.length; n++) {
                  URL.revokeObjectURL(filesData[n].url);
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <label htmlFor="campaign">Enter Campaign details:</label>
            <textarea
              name="campaign"
              id="campaign"
              placeholder="campaign details"
              rows="4"
              cols="50"
            />
            <input type="file" name="files" id="files" multiple />
            <button type="submit">Create Project</button>
          </form>
        </div>
      </>
    );
}

export default App;
