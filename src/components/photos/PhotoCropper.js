import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  photoControls: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  buttonSpacing: {
    marginRight: theme.spacing(2),
  },
  previewImage: {
    maxWidth: "100%",
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const PhotoCropper = ({
  photoData,
  setPhotoData,
  photoProgress,
  setPhotoProgress,
  uppy,
}) => {
  const classes = useStyles();
  const imgRef = React.useRef(null);
  const [crop, setCrop] = React.useState({});
  const [photoSrc, setPhotoSrc] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState();
  const [cropBlob, setCropBlob] = React.useState();

  const inPreviewMode = photoProgress === "PREVIEW";

  const handleCancel = () => {
    setPhotoProgress("BASE");
    setPhotoData(null);
  };

  const handleDone = async () => {
    const newCropBlob = await createCropPreview(
      imgRef.current,
      crop,
      photoData.data.name
    );
    setCropBlob(newCropBlob);
    window.URL.revokeObjectURL(previewUrl);
    setPreviewUrl(window.URL.createObjectURL(cropBlob));
    setPhotoProgress("PREVIEW");
  };

  const handleMakeChanges = () => {
    setPhotoProgress("CROPPING");
  };

  const handleConfirm = async () => {
    const croppedFile = {
      ...photoData,
      data: cropBlob,
      croppedByUser: true,
    };
    setPhotoProgress("CROPPED");
    uppy.addFile(croppedFile);
    window.URL.revokeObjectURL(previewUrl);
    setPhotoData(croppedFile);
  };

  React.useEffect(() => {
    if (!photoData) return undefined;
    const originalPhotoObjectUrl = window.URL.createObjectURL(photoData.data);
    setPhotoSrc(originalPhotoObjectUrl);
    return () => window.URL.revokeObjectURL(originalPhotoObjectUrl);
  }, [photoData]);

  const onLoad = React.useCallback((img) => {
    imgRef.current = img;
  }, []);

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const cropBlob = await createCropPreview(
        imgRef.current,
        crop,
        photoData.data.name
      );
      setCropBlob(cropBlob);
      window.URL.revokeObjectURL(previewUrl);
      setPreviewUrl(window.URL.createObjectURL(cropBlob));
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    // Based on https://github.com/DominicTobias/react-image-crop#what-about-showing-the-crop-on-the-client
    // and https://codesandbox.io/s/beautiful-wildflower-kobkt
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        item
        xs={12}
        container
        justify="center"
        alignItems="center"
        className={classes.photoControls}
      >
        <Grid
          item
          xs={12}
          md={6}
          container
          justify="flex-start"
          alignItems="center"
        >
          <Typography variant="body1">
            {inPreviewMode
              ? "Your cropped image looks like this. Do you want to go ahead and upload it?"
              : "Crop the image as best you can to remove most, but not all, blank space. Keep the label in!"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          justify="flex-end"
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={inPreviewMode ? handleMakeChanges : handleCancel}
            className={classes.buttonSpacing}
          >
            {inPreviewMode ? "Change Crop" : "Cancel"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={inPreviewMode ? handleConfirm : handleDone}
          >
            {inPreviewMode ? "Upload" : "Done"}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        {inPreviewMode ? (
          previewUrl && (
            <img
              alt="Crop preview"
              src={previewUrl}
              className={classes.previewImage}
            />
          )
        ) : (
          <ReactCrop
            src={photoSrc}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(crop) => setCrop(crop)}
            onComplete={makeClientCrop}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default PhotoCropper;
