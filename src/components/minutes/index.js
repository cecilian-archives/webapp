import React from "react";
import { Grid, Button } from "@material-ui/core";
import FormFields from "../minutes/FormFields";
import FileUploader from "../minutes/FileUploader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  pageContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  pageTitleContainer: {
    margin: theme.spacing(2, 0),
  },
  saveButton: {
    margin: theme.spacing(3, 0),
    width: "100%",
  },
}));

const acquisitionMethods = ["TRANSCRIPTION", "SCAN"];

const MinutesUploadForm = ({
  item,
  setItem,
  uppy,
  handleSave,
  currentlySaving,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <FormFields
          item={item}
          setItem={setItem}
          acquisitionMethods={acquisitionMethods}
        />
        <FileUploader item={item} setItem={setItem} uppy={uppy} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={
            currentlySaving ||
            !Boolean(item.files.length) ||
            !(item.collection && item.acquisitionMethod)
          }
          className={classes.saveButton}
        >
          {currentlySaving ? "Saving..." : "Save"}
        </Button>
      </Grid>
    </>
  );
};

export default MinutesUploadForm;
