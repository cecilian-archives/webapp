import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { tagTypeProperties } from "./config";

const getTagColour = (tag) => {
  if (tag.type === "EVENT") {
    return tagTypeProperties[tag.type].colour[tag.event.type];
  } else if (tag.type === "ROLE") {
    return tagTypeProperties[tag.type].colour[tag.role.type];
  } else {
    return tagTypeProperties[tag.type].colour;
  }
};

const useStyles = makeStyles((theme) => ({
  tagChipColor: ({ tag }) => ({
    color: theme.palette[getTagColour(tag)].main,
  }),
  tagChipColorFade: ({ tag }) => ({
    color: fade(theme.palette[getTagColour(tag)].main, 0.7),
    "&:hover": {
      color: theme.palette[getTagColour(tag)].main,
    },
  }),
  tagChipBorder: ({ tag }) => ({
    margin: theme.spacing(0.5),
    padding: theme.spacing(0, 0.5),
    color: theme.palette[getTagColour(tag)].main,
    border: `1px solid ${theme.palette[getTagColour(tag)].main}`,
  }),
}));

const getTagDisplayText = (tag) => {
  switch (tag.type) {
    case "PERSON":
      return tag.person.name;
    case "YEAR":
      return tag.year.name;
    case "EVENT":
      return (
        tag.event.name +
        (tag.event.year
          ? ` (${tag.event.year.name})`
          : tag.year
          ? ` (${tag.year.name})`
          : "")
      );
    case "ROLE":
      const eventName = tag.role.event
        ? tag.role.event.name
        : tag.event
        ? tag.event.name
        : "";
      const yearName =
        tag.role.event && tag.role.event.year
          ? tag.role.event.year.name
          : tag.event && tag.event.year
          ? tag.event.year.name
          : tag.year
          ? tag.year.name
          : "";
      return (
        tag.role.name +
        (eventName || yearName
          ? ` (${eventName || ""}${eventName && yearName ? ", " : ""}${
              yearName || ""
            })`
          : "")
      );
    default:
      return "[Unknown tag type]";
  }
};

const TagChip = ({ tag, onClick, onDelete }) => {
  const classes = useStyles({ tag });
  return (
    <Chip
      classes={{
        outlinedPrimary: classes.tagChipBorder,
        iconColorPrimary: classes.tagChipColor,
        deleteIconOutlinedColorPrimary: classes.tagChipColorFade,
      }}
      color="primary"
      variant="outlined"
      clickable
      onClick={onClick}
      onDelete={onDelete}
      icon={tagTypeProperties[tag.type].icon}
      label={getTagDisplayText(tag)}
    />
  );
};

export default TagChip;
