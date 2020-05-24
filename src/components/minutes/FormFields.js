import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  formField: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
  },
  messages: {
    marginTop: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.error.main,
  },
}));

const FormFields = ({ item, setItem, acquisitionMethods }) => {
  const classes = useStyles();

  const generateReference = (name) => (value) => {
    if (name !== "collection" && name !== "associatedDate") return "";

    const collectionValue = name === "collection" ? value : item.collection;
    const dateValue = name === "associatedDate" ? value : item.associatedDate;

    const collectionRef = collectionValue ? collectionValue : "";
    const dateRef =
      dateValue && !isNaN(dateValue.getTime())
        ? format(dateValue, "yyyyMMdd")
        : "";
    return collectionRef || dateRef ? `${collectionRef}-${dateRef}` : "";
  };

  const handleChange = (name) => (event) => {
    const newValue = event?.target?.value || "";
    const sanitiseCollection = (value) =>
      String(value).toUpperCase().replace(/\s/g, "");
    name === "collection"
      ? setItem({
          ...item,
          archiveId: generateReference(name)(sanitiseCollection(newValue)),
          [name]: sanitiseCollection(newValue),
        })
      : setItem({ ...item, [name]: newValue });
  };

  const handleDateChange = (date) => {
    setItem({
      ...item,
      archiveId: generateReference("associatedDate")(date),
      associatedDate: date,
    });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="collection"
        label="Collection"
        className={classes.formField}
        value={item.collection}
        onChange={handleChange("collection", { updateRef: true })}
        variant="outlined"
        required
        placeholder="The minute book that the item is part of e.g. MB1"
      />
      <KeyboardDatePicker
        openTo="year"
        views={["year", "month", "date"]}
        format="yyyy-MM-dd"
        clearable
        minDate={new Date("1952-10-18")}
        maxDate={new Date()}
        id="associatedDate"
        label="Associated Date"
        className={classes.formField}
        value={item.associatedDate}
        onChange={handleDateChange}
        inputVariant="outlined"
        placeholder="The date of the minutes, if there is one, in YYYY-MM-DD format"
      />
      <TextField
        id="archiveId"
        label="Archive Reference (automatically generated)"
        className={classes.formField}
        value={item.archiveId || ""}
        variant="outlined"
        required
        disabled
      />
      <TextField
        select
        id="acquisitionMethod"
        label="Method of digitisation"
        className={classes.formField}
        value={item.acquisitionMethod}
        InputLabelProps={{ shrink: Boolean(item.acquisitionMethod) }}
        onChange={handleChange("acquisitionMethod")}
        variant="outlined"
        required
      >
        {acquisitionMethods.map((option) => {
          const lcOption = String(option).toLowerCase();
          const displayOption =
            lcOption.charAt(0).toUpperCase() + lcOption.slice(1);
          return (
            <MenuItem key={option} value={option}>
              {displayOption}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        id="acquiredBy"
        label="Digitised by"
        className={classes.formField}
        value={item.acquiredBy}
        onChange={handleChange("acquiredBy")}
        variant="outlined"
        placeholder="The person who digitised the content for the archive (probably you)"
      />
      <TextField
        id="uploadedBy"
        label="Uploaded by"
        className={classes.formField}
        value={item.uploadedBy}
        onChange={handleChange("uploadedBy")}
        variant="outlined"
        placeholder="Your name, as the person uploading the item"
      />
      <TextField
        id="notes"
        label="Notes"
        multiline
        rows="4"
        className={classes.formField}
        value={item.notes}
        onChange={handleChange("notes")}
        variant="outlined"
        placeholder="Are these minutes from an AGM? Are they actually minutes at all? Any other info."
      />
    </form>
  );
};

export default FormFields;
