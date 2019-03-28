import React from "react";
import { withStyles } from "@material-ui/core/styles";
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
  { value: "DIGITAL_NATIVE", label: "Native Digital Content" },
  { value: "PREVIOUSLY_DIGITISED", label: "Previously Digitised Content" },
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
  introText: {
    marginBottom: 3 * theme.spacing.unit,
  },
});

const Step1 = ({ item, setItem, faunaRef, setFaunaRef, classes }) => {
  const [currentlySaving, setCurrentlySaving] = React.useState(false);
  const [changed, setChanged] = React.useState(false);

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

  return (
    <>
      <Typography variant="body1" className={classes.introText}>
        Form with info fields about the document to upload to FaunaDB
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
          placeholder="The date of the minutes, if there is one"
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
          placeholder="The original creator of the content - probably the minuting secretary"
        />
        <TextField
          id="acquisitionMethod"
          select
          label="Acquisition Method"
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
          label="Acquired by"
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
          placeholder="Your name as the person uploading the item"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            setCurrentlySaving(true);
            const itemSaveResponse = await saveArchiveItem(faunaRef, item);
            setFaunaRef(itemSaveResponse.ref);
            setChanged(false);
            setCurrentlySaving(false);
          }}
          disabled={currentlySaving || !changed}
        >
          Save
        </Button>
      </form>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </>
  );
};

export default withStyles(styles)(Step1);
