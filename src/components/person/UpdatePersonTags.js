import React from "react";
import { Grid } from "@material-ui/core";
import TagBuilder from "../shared/TagBuilder/";
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

const UPDATE_PERSON = gql`
  mutation($person: CecilianInput!) {
    setCecilian(cecilian: $person) {
      id
      name
      updatedAt
    }
  }
`;

const UpdatePersonTags = ({ currentPerson, enteredTags, setEnteredTags }) => {
  const classes = useStyles();
  const [statusToDisplay, setStatusToDisplay] = React.useState("");

  const [updatePerson, { loading }] = useMutation(UPDATE_PERSON);

  const handleSave = async () => {
    const personInput = {
      id: currentPerson.person.id,
      tags: enteredTags.map((tag) => ({
        ...(tag.id ? { id: tag.id } : {}),
        type: tag.type,
        ...(tag.person ? { person: tag.person?.id } : {}),
        ...(tag.year ? { year: tag.year?.id } : {}),
        ...(tag.event ? { event: tag.event?.id } : {}),
        ...(tag.role ? { role: tag.role?.id } : {}),
      })),
    };
    console.log(personInput);
    const { error, data } = await updatePerson({
      variables: { person: personInput },
    });
    if (error) {
      setStatusToDisplay(error);
    } else {
      setStatusToDisplay(`Successful save: ${data.setCecilian.name}`);
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
        <TagBuilder enteredTags={enteredTags} setEnteredTags={setEnteredTags} />
      </Grid>
      <ButtonWithStatus
        isInFlight={loading}
        alsoDisableWhen={enteredTags.length === 0}
        standardLabel="Save Tags"
        inFlightLabel="Saving..."
        statusToDisplay={statusToDisplay}
        onClick={handleSave}
      />
    </Grid>
  );
};

export default UpdatePersonTags;
