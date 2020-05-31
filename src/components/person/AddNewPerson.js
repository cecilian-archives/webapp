import React from "react";
import { Grid, TextField } from "@material-ui/core";
import ButtonWithStatus from "./ButtonWithStatus";
import { gql, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
  saveButtonContainer: {
    margin: theme.spacing(1, 0, 3, 0),
    width: "100%",
  },
}));

const ADD_PERSON = gql`
  mutation($person: CecilianInput!) {
    setCecilian(cecilian: $person) {
      id
      name
    }
  }
`;

const AddNewPerson = ({ successCallback }) => {
  const classes = useStyles();
  const [newPersonName, setNewPersonName] = React.useState("");
  const [statusToDisplay, setStatusToDisplay] = React.useState("");

  const [addNewPerson, { loading }] = useMutation(ADD_PERSON);

  const handleNameChange = (event) => {
    const newValue = event?.target?.value || "";
    setNewPersonName(newValue);
  };

  const handleAddNewPerson = async () => {
    const { data, error } = await addNewPerson({
      variables: { person: { name: newPersonName } },
    });
    if (error) {
      setStatusToDisplay(error);
    } else {
      setNewPersonName("");
      setStatusToDisplay(
        `Successfully created ${data.setCecilian.name} with ID ${data.setCecilian.id}`
      );
      successCallback && successCallback();
    }
  };

  return (
    <Grid
      className={classes.fullWidth}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} className={classes.fullWidth}>
        <TextField
          id="newPersonName"
          label="Display Name"
          className={classes.fullWidth}
          value={newPersonName}
          onChange={handleNameChange}
          variant="outlined"
          placeholder="Display name of a new person to add"
        />
      </Grid>
      <ButtonWithStatus
        isInFlight={loading}
        standardLabel="Add New Person"
        inFlightLabel="Saving..."
        statusToDisplay={statusToDisplay}
        onClick={handleAddNewPerson}
      />
    </Grid>
  );
};

export default AddNewPerson;
