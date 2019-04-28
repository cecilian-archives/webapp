import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { DatePicker } from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { saveArchiveItem } from "./dbUtils";

const acquisitionMethods = [
  { value: "TRANSCRIPTION", label: "Transcription" },
  { value: "SCAN", label: "Scan" },
  // { value: "DIGITAL_NATIVE", label: "Native Digital Content" },
  // { value: "PREVIOUSLY_DIGITISED", label: "Previously Digitised Content" },
];

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontWeight: "bold",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  formField: {
    marginTop: 0,
    marginBottom: 2 * theme.spacing.unit,
  },
  introTextTop: {
    marginTop: theme.spacing.unit,
    marginBottom: 0.5 * theme.spacing.unit,
  },
  introTextBottom: {
    marginTop: 0.5 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
  },
  saveReminder: {
    marginTop: 4 * theme.spacing.unit,
    marginBottom: -2 * theme.spacing.unit,
  },
  messages: {
    marginTop: 2 * theme.spacing.unit,
    textAlign: "center",
  },
});

const Step1 = ({ item, setItem, faunaRef, setFaunaRef, classes }) => {
  const [currentlySaving, setCurrentlySaving] = React.useState(false);
  const [changed, setChanged] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);

  const generateReference = name => value => {
    if (name !== "collection" && name !== "associatedDate") return "";

    const collectionValue = name === "collection" ? value : item.collection;
    const dateValue = name === "associatedDate" ? value : item.associatedDate;

    const collectionRef = collectionValue ? collectionValue : "";
    const dateRef = dateValue ? format(dateValue, "yyyyMMdd") : "";
    return collectionRef || dateRef ? `${collectionRef}-${dateRef}` : "";
  };

  const handleChange = (
    name,
    options = { dateType: false, updateRef: false }
  ) => event => {
    const newValue = options.dateType
      ? event
        ? parseISO(
            `${format(
              new Date(event.getFullYear(), event.getMonth(), event.getDate()),
              "yyyy-MM-dd"
            )}T00:00:00Z`
          )
        : null
      : event.target.value;
    options.updateRef
      ? setItem({
          ...item,
          archiveId: generateReference(name)(newValue),
          [name]: newValue,
        })
      : setItem({ ...item, [name]: newValue });
    setChanged(true);
  };

  const handleSave = async () => {
    try {
      setCurrentlySaving(true);
      const itemSaveResponse = await saveArchiveItem(faunaRef, item);
      setFaunaRef(itemSaveResponse.ref);
      setChanged(false);
      setCurrentlySaving(false);
      setSaveError(false);
    } catch (e) {
      window.CECILIAN_DEBUG && console.error(e);
      setSaveError(
        "Unable to save! Something is going wrong behind the scenes and will need investigated by the archive team :/"
      );
      setFaunaRef(null);
      setChanged(false);
      setCurrentlySaving(false);
    }
  };

  return (
    <>
      <Typography variant="body1" className={classes.introTextTop}>
        Please fill out as much of the following information as you can about
        the set of minutes you are about to upload. Required fields are marked
        with *.
      </Typography>
      <Typography variant="body1" className={classes.introTextBottom}>
        Click on each field for more information on what it should contain!
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="collection"
          label="Collection"
          className={classes.formField}
          value={item.collection}
          onChange={handleChange("collection", { updateRef: true })}
          margin="normal"
          variant="outlined"
          required
          placeholder="The minute book that the item is part of e.g. MB1"
        />
        <DatePicker
          openTo="year"
          views={["year", "month", "day"]}
          keyboard
          format="yyyy-MM-dd"
          mask={value =>
            value
              ? [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]
              : []
          }
          clearable
          minDate={new Date("1952-10-18")}
          maxDate={new Date()}
          id="associatedDate"
          label="Associated Date"
          className={classes.formField}
          value={item.associatedDate}
          onChange={handleChange("associatedDate", {
            dateType: true,
            updateRef: true,
          })}
          margin="normal"
          variant="outlined"
          placeholder="The date of the minutes, if there is one, in YYYY-MM-DD format"
        />
        <TextField
          id="archiveId"
          label="Archive Reference (automatically generated)"
          className={classes.formField}
          value={item.archiveId || ""}
          margin="normal"
          variant="outlined"
          required
          disabled
        />
        <TextField
          id="createdBy"
          label="Created by"
          className={classes.formField}
          value={item.createdBy}
          onChange={handleChange("createdBy")}
          margin="normal"
          variant="outlined"
          placeholder="The original creator of the content, if known - probably the minuting secretary"
        />
        <TextField
          id="acquisitionMethod"
          select
          label="Method of digitisation"
          className={classes.formField}
          value={item.acquisitionMethod}
          InputLabelProps={{ shrink: item.acquisitionMethod ? true : false }}
          onChange={handleChange("acquisitionMethod")}
          margin="normal"
          variant="outlined"
          required
        >
          {acquisitionMethods.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="acquiredBy"
          label="Digitised by"
          className={classes.formField}
          value={item.acquiredBy}
          onChange={handleChange("acquiredBy")}
          margin="normal"
          variant="outlined"
          placeholder="The person who digitised the content for the archive (probably you)"
        />
        <TextField
          id="notes"
          label="Notes"
          multiline
          rows="4"
          className={classes.formField}
          value={item.notes}
          onChange={handleChange("notes")}
          margin="normal"
          variant="outlined"
          placeholder="Are these minutes from an AGM? Are they actually minutes at all? Any other info."
        />
        {/* // TODO: A tagging system!
        <TextField
          id="tags"
          label="Tags"
          className={classes.formField}
          value={item.tags}
          onChange={handleChange("tags")}
          margin="normal"
          variant="outlined"
        /> */}
        <TextField
          id="uploadedBy"
          label="Uploaded by"
          className={classes.formField}
          value={item.uploadedBy}
          onChange={handleChange("uploadedBy")}
          margin="normal"
          variant="outlined"
          placeholder="Your name, as the person uploading the item"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={currentlySaving || !changed}
        >
          {currentlySaving ? "Saving..." : !changed ? "Saved" : "Save"}
        </Button>
        {!changed && (
          <Typography variant="body2" className={classes.messages}>
            {saveError}
          </Typography>
        )}
      </form>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className={classes.saveReminder}
      >
        <Typography variant="body1">
          Remember to save this info before moving on to the next step!
        </Typography>
      </Grid>
      {window.CECILIAN_DEBUG && <pre>{JSON.stringify(item, null, 2)}</pre>}
    </>
  );
};

export default withStyles(styles)(Step1);
