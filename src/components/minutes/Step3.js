import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { saveArchiveItem } from "./dbUtils";

const styles = theme => ({
  introTextTop: {
    marginTop: theme.spacing.unit,
    marginBottom: 0.5 * theme.spacing.unit,
  },
  introTextBottom: {
    marginTop: 0.5 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
  messages: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    color: theme.palette.error.main,
  },
});

const completeUpload = (faunaRef, item, setUploadError) => {
  if (!item.archiveId) {
    setUploadError(
      "Required information from Step 1 is not complete. Use the Back button to return to step 1 and check the info."
    );
    return false;
  }
  if (!item.files) {
    setUploadError(
      "File upload from Step 2 is not complete. Use the Back button to return to step 2 and see if there are any error messages."
    );
    return false;
  }
  try {
    saveArchiveItem(faunaRef, item);
    return true;
  } catch (err) {
    window.CECILIAN_DEBUG && console.error(err);
    setUploadError(
      "Uh oh. Something went wrong in the connection process. Everything you have entered has been saved, but the information needs to be manually connected to the file. Let a member of the archive team know."
    );
    return false;
  }
};

const Step3 = ({
  item,
  faunaRef,
  uploadCompleted,
  setUploadCompleted,
  uploadError,
  setUploadError,
  classes,
}) => {
  return (
    <>
      {uploadCompleted ? (
        <>
          <Typography variant="h5" className={classes.introTextTop}>
            Complete!
          </Typography>
          <Typography variant="body1">
            You've successfully added these minutes to the archive.
          </Typography>
          <Typography variant="body1" className={classes.introTextBottom}>
            Press Start Again if you need to add another set.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" className={classes.introTextTop}>
            Nearly there...
          </Typography>
          <Typography variant="body1" className={classes.introTextBottom}>
            Behind the scenes, the archive system needs to connect the two steps
            that you just completed. Click the Connect button to make this
            happen.
          </Typography>
        </>
      )}
      <Grid container direction="column" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setUploadCompleted(completeUpload(faunaRef, item, setUploadError))
          }
          disabled={uploadCompleted}
        >
          Connect
        </Button>
        <Typography variant="body2" className={classes.messages}>
          {uploadError}
        </Typography>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Step3);
