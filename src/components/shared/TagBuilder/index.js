import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import TagChip from "./TagChip";
import BuilderDialog from "./BuilderDialog";
import AddIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import { tagTypeProperties, sortTags, sanitiseTag } from "./config";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    fontWeight: "bold",
    width: "100%",
  },
  tagBuilderRoot: {
    width: "100%",
    margin: theme.spacing(2, 0),
  },
  hideCaret: {
    caretColor: "transparent",
  },
  endAdornment: {
    marginLeft: theme.spacing(1),
  },
  iconButton: {
    padding: 12,
    marginTop: -10,
  },
}));

const TagBuilder = ({ enteredTags, setEnteredTags, displayOnly = false }) => {
  const classes = useStyles();
  const [tagDialogOpen, setTagDialogOpen] = React.useState(false);
  const [currentTag, setCurrentTag] = React.useState({});

  const handleTagClick = (index) => () => {
    if (displayOnly) return;
    setCurrentTag({ editIndex: index, ...enteredTags[index] });
    setTagDialogOpen(true);
  };

  const handleTagDelete = (index) => () =>
    setEnteredTags(enteredTags.filter((tag, idx) => idx !== index));

  const handleTagAdd = (tag) => {
    const { editIndex, ...tagToSanitise } = tag;
    const tagToAdd = sanitiseTag(tagToSanitise);
    if (!tagToAdd.type || !tagToAdd[tagToAdd.type.toLowerCase()])
      return {
        success: false,
        message: "Some required properties are missing.",
      };

    const tagsToMatch =
      editIndex !== undefined
        ? enteredTags.filter((tag, index) => index !== editIndex)
        : enteredTags;
    const matchingTags = tagsToMatch.filter((existingTag) =>
      tagTypeProperties[tagToAdd.type].checkEquality(tagToAdd, existingTag)
    );
    if (matchingTags.length > 0)
      return {
        success: false,
        message:
          "This tag already exists in some form. To add new info, edit the existing tag.",
      };

    setEnteredTags(sortTags([...tagsToMatch, tagToAdd]));
    return { success: true };
  };

  return (
    <Grid item xs={12} className={classes.tagBuilderRoot}>
      <Autocomplete
        id="tags"
        classes={{
          endAdornment: classes.endAdornment,
          popupIndicator: classes.iconButton,
        }}
        multiple
        fullWidth
        disabled={displayOnly}
        disableClearable
        forcePopupIcon={!displayOnly}
        openText="Add a tag"
        popupIcon={<AddIcon />}
        onOpen={() => setTagDialogOpen(true)}
        freeSolo
        options={[]}
        value={enteredTags}
        inputValue=""
        renderTags={(value) =>
          value.map((tagValue, index) => (
            <TagChip
              key={index}
              tag={tagValue}
              onClick={handleTagClick(index)}
              onDelete={displayOnly ? undefined : handleTagDelete(index)}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Tags"
            value=""
            className={classes.hideCaret}
          />
        )}
      />
      <BuilderDialog
        open={tagDialogOpen}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
        handleClose={() => setTagDialogOpen(false)}
        handleSave={handleTagAdd}
      />
    </Grid>
  );
};

export default TagBuilder;
