import React from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  TextField,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ConnectedAutocomplete from "./ConnectedAutocomplete";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { tagTypeProperties } from "./config";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: theme.spacing(3, 3, 0, 3),
  },
  actionsContainer: {
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  tagTypeInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    maxHeight: "1.1876em",
  },
  tagTypeField: {
    margin: theme.spacing(0),
  },
  linkContainer: {
    margin: theme.spacing(4, 0, 3, 0),
  },
  link: {
    color: theme.palette.grey[600],
    "&:hover": {
      color: theme.palette.grey[800],
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FieldsByTagType = ({ currentTag, setCurrentTag, changeCallback }) => {
  switch (currentTag.type) {
    case "YEAR":
      return (
        <ConnectedAutocomplete
          type="YEAR"
          required
          tagToEdit={currentTag}
          setTag={setCurrentTag}
          changeCallback={changeCallback}
        />
      );
    case "PERSON":
      return (
        <ConnectedAutocomplete
          type="PERSON"
          required
          tagToEdit={currentTag}
          setTag={setCurrentTag}
          changeCallback={changeCallback}
        />
      );
    case "EVENT":
      return (
        <>
          <ConnectedAutocomplete
            type="EVENT"
            required
            tagToEdit={currentTag}
            setTag={setCurrentTag}
            changeCallback={changeCallback}
          />
          {!currentTag.event?.year && (
            <ConnectedAutocomplete
              type="YEAR"
              tagToEdit={currentTag}
              setTag={setCurrentTag}
              changeCallback={changeCallback}
              hidden={!currentTag.event}
            />
          )}
        </>
      );
    case "ROLE":
      const secondaryIsYear =
        currentTag.role?.type === "COMMITTEE" ||
        currentTag.role?.type === "SOCIETY";
      return (
        <>
          <ConnectedAutocomplete
            type="ROLE"
            required
            tagToEdit={currentTag}
            setTag={setCurrentTag}
            changeCallback={changeCallback}
          />
          {((secondaryIsYear && !currentTag.role?.event?.year) ||
            !currentTag.role?.event) && (
            <ConnectedAutocomplete
              type={secondaryIsYear ? "YEAR" : "EVENT"}
              tagToEdit={currentTag}
              setTag={setCurrentTag}
              changeCallback={changeCallback}
              hidden={!currentTag.role}
            />
          )}
        </>
      );
    default:
      return null;
  }
};

const BuilderDialog = ({
  open,
  handleClose,
  handleSave,
  currentTag,
  setCurrentTag,
}) => {
  const classes = useStyles();
  const [saveError, setSaveError] = React.useState("");

  const handleClear = () => {
    setCurrentTag({});
    setSaveError("");
    handleClose();
  };

  const handleAdd = () => {
    const { success, message } = handleSave(currentTag);
    if (success) {
      handleClear();
    } else {
      setSaveError(message);
    }
  };

  const handleTypeChange = (event) => {
    setSaveError("");
    setCurrentTag({ type: event.target.value });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="tag-builder-title"
    >
      <DialogTitle disableTypography id="tag-builder-title">
        <Typography variant="h6">Build a Tag</Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClear}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers classes={{ root: classes.contentContainer }}>
        <TextField
          className={classes.tagTypeField}
          variant="outlined"
          fullWidth
          required
          select
          label="Type"
          value={currentTag.type || ""}
          onChange={handleTypeChange}
          InputProps={{ classes: { input: classes.tagTypeInput } }}
        >
          {Object.keys(tagTypeProperties).map((type) => (
            <MenuItem key={type} value={type}>
              <ListItemIcon>{tagTypeProperties[type].icon}</ListItemIcon>
              <ListItemText
                primary={`${tagTypeProperties[type].label} Tag`}
                secondary={tagTypeProperties[type].description}
              />
            </MenuItem>
          ))}
        </TextField>
        <FieldsByTagType
          currentTag={currentTag}
          setCurrentTag={setCurrentTag}
          changeCallback={() => setSaveError("")}
        />
        {saveError && (
          <Typography variant="body2" color="error">
            {saveError}
          </Typography>
        )}
        <DialogContentText className={classes.linkContainer}>
          Need a new tag? Something not working? Contact{" "}
          <a
            className={classes.link}
            href="mailto:archive@ceciliansociety.co.uk"
          >
            archive@ceciliansociety.co.uk
          </a>
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsContainer }}>
        <Button variant="outlined" color="primary" onClick={handleClear}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          {currentTag.editIndex !== undefined ? "Save Changes" : "Add Tag"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuilderDialog;
