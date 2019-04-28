import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  spaceTop: {
    marginTop: theme.spacing.unit,
  },
  spaceBottom: {
    marginBottom: theme.spacing.unit,
  },
});

const Step0 = ({ classes }) => (
  <>
    <Typography variant="body1" className={classes.spaceTop}>
      And congratulations on having some minutes to upload!
    </Typography>
    <Typography variant="body1" className={classes.spaceTop}>
      This process contains three steps.
    </Typography>
    <Typography variant="body1" className={classes.spaceTop}>
      First, you'll be asked to provide some information about the set of
      minutes you are uploading. Then, you can select your saved PDF file
      (either transcription or scan) to upload. Finally, the archive system will
      connect all of this information together and ensure the upload was
      successful.
    </Typography>
    <Typography variant="body1" className={classes.spaceTop}>
      You can use the Back and Next buttons below throughout the process to
      navigate. If you need any help, just ask the member of the archive team
      who signed out the book to you.
    </Typography>
    <Typography variant="body1" className={classes.spaceTop}>
      Click the Next button now to get started!
    </Typography>
  </>
);

export default withStyles(styles)(Step0);
