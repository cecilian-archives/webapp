import React from "react";
import { Grid, Button } from "@material-ui/core";
import FormFields from "../minutes/FormFields";
import FileUploader from "../minutes/FileUploader";
import TagBuilder from "../shared/TagBuilder/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  minutesUploadFormRoot: {
    width: "100%",
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
  const setEnteredTags = (tags) => setItem({ ...item, tags });
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
        <TagBuilder enteredTags={item.tags} setEnteredTags={setEnteredTags} />
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
