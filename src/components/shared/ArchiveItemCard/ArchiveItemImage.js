import React from "react";
import { CircularProgress } from "@material-ui/core";
import useImage from "react-image/esm/useImage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "35%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePadding: {
    margin: theme.spacing(2),
  },
  image: {
    width: "100%",
  },
}));

const ArchiveItemImage = ({ item, isHovered }) => {
  const classes = useStyles();
  const containerClass =
    item.type === "MINUTES" && item.acquisitionMethod === "TRANSCRIPTION"
      ? `${classes.imageContainer} ${classes.imagePadding}`
      : classes.imageContainer;

  const getImageUrl = (imageType) =>
    item.files
      .filter((file) => file.kind === imageType)
      .map((file) => file.ssl_url);

  const {
    src: thumbnailSrc,
    isLoading: thumbnailLoading,
    error: thumbnailError,
  } = useImage({
    srcList: getImageUrl("THUMBNAIL"),
    useSuspense: false,
  });
  const {
    src: animatedSrc,
    isLoading: animatedLoading,
    error: animatedError,
  } = useImage({
    srcList: getImageUrl("ANIMATED_THUMBNAIL"),
    useSuspense: false,
  });

  if (thumbnailError) return null;

  return (
    <div className={containerClass}>
      {thumbnailLoading ? (
        <CircularProgress className={classes.image} />
      ) : isHovered && !animatedLoading && !animatedError ? (
        <img alt="" className={classes.image} src={animatedSrc} />
      ) : (
        <img alt="" className={classes.image} src={thumbnailSrc} />
      )}
    </div>
  );
};

export default ArchiveItemImage;
