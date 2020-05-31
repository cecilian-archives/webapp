import React from "react";
import { Grid } from "@material-ui/core";
import AddNewPerson from "./AddNewPerson";
import LoadPersonTags from "./LoadPersonTags";
import UpdatePersonTags from "./UpdatePersonTags";
import { makeStyles } from "@material-ui/core/styles";
import { sortTags } from "../shared/TagBuilder/config";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
  saveButtonContainer: {
    margin: theme.spacing(1, 0, 3, 0),
    width: "100%",
  },
}));

const PersonTagger = () => {
  const classes = useStyles();
  const [currentPerson, setCurrentPerson] = React.useState({});
  const [enteredTags, setEnteredTags] = React.useState([]);

  return (
    <Grid
      className={classes.fullWidth}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <AddNewPerson />
      <LoadPersonTags
        currentPerson={currentPerson}
        setCurrentPerson={setCurrentPerson}
        successCallback={(tags) => setEnteredTags(sortTags(tags))}
      />
      <UpdatePersonTags
        currentPerson={currentPerson}
        enteredTags={enteredTags}
        setEnteredTags={setEnteredTags}
      />
    </Grid>
  );
};

export default PersonTagger;
