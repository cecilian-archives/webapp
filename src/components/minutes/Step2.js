import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const Step2 = ({ item, setItem, uppy }) => {
  uppy.on("transloadit:complete", assembly => {
    console.log(assembly.results);
    setItem({ ...item, files: assembly.results });
  });
  return (
    <>
      <Typography variant="body1">
        Actual file upload with Uppy (inline React component)
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Dashboard
          uppy={uppy}
          inline={true}
          width={undefined}
          height={350}
          showLinkToFileUploadResult={false}
          showProgressDetails={true}
          hideProgressAfterFinish={false}
          note="PDF only. One file at a time!"
          proudlyDisplayPoweredByUppy={false}
          locale={{
            strings: {
              dropPasteImport:
                "Drag and drop files here, %{browse} or import from",
              dropPaste: "Drag and drop files here, or %{browse}",
              browse: "open the file picker",
            },
          }}
        />
      </Grid>
    </>
  );
};

export default Step2;
