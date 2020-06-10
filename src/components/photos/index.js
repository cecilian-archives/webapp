import React from "react";
import { Grid, Button } from "@material-ui/core";
import FormFields from "./FormFields";
import FileUploader from "./FileUploader";
import PhotoCropper from "./PhotoCropper";
import TagBuilder from "../shared/TagBuilder/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
  saveButtonContainer: {
    margin: theme.spacing(3, 0),
    width: "100%",
  },
}));

const acquisitionMethods = ["SCAN"];

const PhotosUploadForm = ({
  item,
  setItem,
  tags,
  setTags,
  uppy,
  handleSave,
  currentlySaving,
  photoProgress,
  setPhotoProgress,
  photoData,
  setPhotoData,
}) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.fullWidth}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={10} md={8} className={classes.fullWidth}>
        <FormFields
          item={item}
          setItem={setItem}
          acquisitionMethods={acquisitionMethods}
        />
        {photoProgress === "CROPPING" || photoProgress === "PREVIEW" ? (
          <PhotoCropper
            photoData={photoData}
            setPhotoData={setPhotoData}
            photoProgress={photoProgress}
            setPhotoProgress={setPhotoProgress}
            uppy={uppy}
          />
        ) : (
          <FileUploader item={item} setItem={setItem} uppy={uppy} />
        )}
        <TagBuilder enteredTags={tags} setEnteredTags={setTags} />
      </Grid>
      <Grid item xs={12} sm={10} md={8} className={classes.saveButtonContainer}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={
            currentlySaving ||
            !Boolean(item.files.length) ||
            !(item.collection && item.acquisitionMethod)
          }
          className={classes.fullWidth}
        >
          {currentlySaving ? "Saving..." : "Save"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PhotosUploadForm;
