import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FirebaseLogin from "../login/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  pageTitleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.pageContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.pageTitleContainer}
      >
        <Typography variant="h4">Login</Typography>
        <FirebaseLogin />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
