import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import PhotosUploadForm from "../photos/";
import { gql, useMutation } from "@apollo/client";
import useUppy from "../../hooks/useUppy";
import { makeStyles } from "@material-ui/core/styles";
import {
  transloaditPhotosTemplateId,
  transloaditPhotosAllowedFileTypes,
} from "../../config";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  pageTitleContainer: {
    margin: theme.spacing(2, 0),
  },
  errorText: {
    fontFamily: "monospace",
    margin: theme.spacing(2, 0),
  },
}));

const ADD_ARCHIVE_ITEM = gql`
  mutation($item: ArchiveItemInput!) {
    setArchiveItem(item: $item) {
      id
      archiveId
      type
    }
  }
`;

const emptyItem = {
  archiveId: "",
  type: "PHOTOS",
  acquisitionMethod: "SCAN",
  collection: "",
  indexInCollection: "",
  associatedDate: null,
  notes: "",
  acquiredBy: "",
  uploadedBy: "",
  files: [],
};

const PhotosPage = () => {
  const classes = useStyles();
  const [item, setItem] = React.useState(emptyItem);
  const [tags, setTags] = React.useState([]);
  const [uploadCompleted, setUploadCompleted] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(false);

  // This should flow like BASE -> CROPPING <-> PREVIEW -> CROPPED -> BASE
  const [photoProgress, setPhotoProgress] = React.useState("BASE");
  const [photoData, setPhotoData] = React.useState(null);

  const uppy = useUppy({
    templateId: transloaditPhotosTemplateId,
    allowedFileTypes: transloaditPhotosAllowedFileTypes,
    onBeforeFileAdded: (file) => {
      if (file.croppedByUser) return true;
      setPhotoProgress("CROPPING");
      setPhotoData(file);
      return false;
    },
    autoProceed: true,
  });

  const [addArchiveItem, { loading, error, data }] = useMutation(
    ADD_ARCHIVE_ITEM,
    {
      onCompleted: () => {
        setUploadCompleted(true);
        console.log(`Successful upload: ${data.id}`);
      },
      onError: () => setUploadError(error),
    }
  );

  const resetState = async () => {
    await uppy.reset();
    setItem(emptyItem);
    setTags([]);
    setPhotoProgress("BASE");
    setUploadCompleted(false);
    setUploadError(false);
  };

  const handleSave = async () => {
    const newItem = {
      ...item,
      tags: tags.map((tag) => ({
        type: tag.type,
        ...(tag.person ? { person: tag.person?.id } : {}),
        ...(tag.year ? { year: tag.year?.id } : {}),
        ...(tag.event ? { event: tag.event?.id } : {}),
        ...(tag.role ? { role: tag.role?.id } : {}),
      })),
    };
    await addArchiveItem({ variables: { item: newItem } });
  };

  return (
    <Grid
      className={classes.pageContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.pageTitleContainer}
      >
        <Typography variant="h4">Photo Upload</Typography>
      </Grid>
      {uploadCompleted ? (
        <>
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            className={classes.pageTitleContainer}
          >
            <Typography variant="body1">
              Upload has completed successfully.
            </Typography>
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
              onClick={resetState}
              className={classes.saveButton}
            >
              Upload Another
            </Button>
          </Grid>
        </>
      ) : uploadError ? (
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          className={classes.pageTitleContainer}
        >
          <Typography variant="body1">
            There has been an upload error. Please show the following error
            message to a member of the archive team.
          </Typography>
          <Typography variant="body1" className={classes.errorText}>
            {uploadError}
          </Typography>
        </Grid>
      ) : (
        <PhotosUploadForm
          item={item}
          setItem={setItem}
          tags={tags}
          setTags={setTags}
          uppy={uppy}
          handleSave={handleSave}
          currentlySaving={loading}
          photoProgress={photoProgress}
          setPhotoProgress={setPhotoProgress}
          photoData={photoData}
          setPhotoData={setPhotoData}
        />
      )}
    </Grid>
  );
};

export default PhotosPage;
