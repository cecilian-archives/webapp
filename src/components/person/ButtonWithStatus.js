import React from "react";
import { Grid, Button } from "@material-ui/core";
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

const ButtonWithStatus = ({
  isInFlight,
  alsoDisableWhen,
  standardLabel,
  inFlightLabel,
  statusToDisplay,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        item
        xs={12}
        className={classes.saveButtonContainer}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={onClick}
          disabled={
            alsoDisableWhen ? isInFlight || alsoDisableWhen : isInFlight
          }
        >
          {isInFlight ? inFlightLabel : standardLabel}
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.fullWidth}>
        <pre>{statusToDisplay}</pre>
      </Grid>
    </>
  );
};

export default ButtonWithStatus;
