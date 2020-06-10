import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import MinutesUploadForm from "../minutes/";
import { gql, useMutation } from "@apollo/client";
import { uppy } from "../minutes/uppyInstance";
import { makeStyles } from "@material-ui/core/styles";

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
  type: "MINUTES",
  acquisitionMethod: "",
  collection: "",
  associatedDate: null,
  notes: "",
  acquiredBy: "",
  uploadedBy: "",
  files: [],
};

const MinutesPage = () => {
  const classes = useStyles();
  const [item, setItem] = React.useState(emptyItem);
  const [tags, setTags] = React.useState([]);
  const [uploadCompleted, setUploadCompleted] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(false);

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
        <Typography variant="h4">Minutes Upload</Typography>
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
        <MinutesUploadForm
          item={item}
          setItem={setItem}
          tags={tags}
          setTags={setTags}
          uppy={uppy}
          handleSave={handleSave}
          currentlySaving={loading}
        />
      )}
    </Grid>
  );
};

export default MinutesPage;
