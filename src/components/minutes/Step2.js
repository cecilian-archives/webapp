import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const styles = theme => ({
  introTextTop: {
    marginTop: theme.spacing.unit,
    marginBottom: 0.5 * theme.spacing.unit,
  },
  introTextBottom: {
    marginTop: 0.5 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
});

const Step2 = ({ item, setItem, uppy, classes }) => {
  uppy.on("transloadit:complete", assembly => {
    window.CECILIAN_DEBUG && console.log(assembly.results);
    setItem({ ...item, files: assembly.results });
  });
  return (
    <>
      <Typography variant="body1" className={classes.introTextTop}>
        Use the box below to actually select and upload the{" "}
        {item.acquisitionMethod === "TRANSCRIPTION"
          ? "transcribed"
          : item.acquisitionMethod === "SCAN"
          ? "scanned"
          : "transcribed/scanned"}{" "}
        PDF file.
      </Typography>
      <Typography variant="body1" className={classes.introTextBottom}>
        Wait for the upload to complete before moving on to the next step. If
        you get any errors, contact a member of the archive team.
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
          proudlyDisplayPoweredByUppy={true}
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

export default withStyles(styles)(Step2);
