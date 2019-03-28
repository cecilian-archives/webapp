import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { saveArchiveItem } from "./dbUtils";

const completeUpload = (faunaRef, item, setUploadError) => {
  if (!item.archiveId) {
    setUploadError("Required information from Step 1 is not complete");
    return false;
  }
  if (!item.files) {
    setUploadError("File upload from Step 2 is not complete");
    return false;
  }
  try {
    saveArchiveItem(faunaRef, item);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const Step3 = ({
  item,
  setItem,
  faunaRef,
  setFaunaRef,
  setActiveStep,
  uppy,
}) => {
  const [uploadCompleted, setUploadCompleted] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);
  return (
    <>
      <Typography variant="body1">
        Connect file ref with Complete / reset completely with Start Again
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          setUploadCompleted(completeUpload(faunaRef, item, setUploadError))
        }
      >
        Complete
      </Button>
      <Typography variant="body2">{uploadError}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setItem({
            type: "MINUTES",
            collection: "",
            associatedDate: null,
            archiveId: "",
            createdBy: "",
            acquisitionMethod: "",
            acquiredBy: "",
            notes: "",
            uploadedBy: "",
          });
          setFaunaRef(null);
          uppy.reset();
          setActiveStep(0);
        }}
        disabled={!uploadCompleted}
      >
        Start Again
      </Button>
    </>
  );
};

export default Step3;
