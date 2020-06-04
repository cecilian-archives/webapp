import React from "react";
import { Grid } from "@material-ui/core";
import ConnectedAutocomplete from "../shared/TagBuilder/ConnectedAutocomplete";
import ButtonWithStatus from "./ButtonWithStatus";
import { gql, useLazyQuery } from "@apollo/client";
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

const GET_PERSON = gql`
  query($personId: String!) {
    getCecilianById(id: $personId) {
      id
      name
      tags {
        id
        type
        ... on EventTag {
          event {
            id
            type
            name
            year {
              id
              name
            }
          }
          year {
            id
            name
          }
        }
        ... on YearTag {
          year {
            id
            name
          }
        }
        ... on PersonTag {
          person {
            id
            name
          }
        }
        ... on RoleTag {
          role {
            id
            type
            name
          }
          year {
            id
            name
          }
          event {
            id
            type
            name
          }
        }
      }
      createdAt
      updatedAt
      userId
    }
  }
`;

const LoadPersonTags = ({
  currentPerson,
  setCurrentPerson,
  successCallback,
}) => {
  const classes = useStyles();
  const [statusToDisplay, setStatusToDisplay] = React.useState("");

  const [getPerson, { loading, error, data }] = useLazyQuery(GET_PERSON, {
    variables: { personId: currentPerson?.person?.id },
    fetchPolicy: "network-only",
    errorPolicy: "none",
    partialRefetch: true,
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      const tags = data?.getCecilianById?.tags || [];
      setStatusToDisplay(
        `Loaded tags for ${currentPerson.person.name}${
          tags.length === 0 ? " (none to show)" : ""
        }`
      );
      successCallback && successCallback(tags);
    },
    onError: () => {
      setStatusToDisplay(
        `Could not load tags for ${currentPerson?.person?.name}. Error was: ${error}`
      );
    },
  });

  const getPersonData = () => {
    setStatusToDisplay(`Loading tags for ${currentPerson?.person?.name}...`);
    getPerson();
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
        <ConnectedAutocomplete
          type="PERSON"
          required
          tagToEdit={currentPerson}
          setTag={setCurrentPerson}
        />
      </Grid>
      <ButtonWithStatus
        isInFlight={loading}
        alsoDisableWhen={Object.keys(currentPerson).length === 0}
        standardLabel="Load Tags"
        inFlightLabel="Loading..."
        statusToDisplay={statusToDisplay}
        onClick={getPersonData}
      />
    </Grid>
  );
};

export default LoadPersonTags;
