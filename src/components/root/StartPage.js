import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/ListAlt";
import ImageIcon from "@material-ui/icons/Image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    fontWeight: "bold",
    width: "100%",
  },
  itemSpaceTop: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  itemSpaceBottom: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const StartPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={10} sm={8} md={6} lg={4} className={classes.itemSpaceTop}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={() => navigate("minutes")}
          startIcon={<ListIcon />}
        >
          Upload Minutes
        </Button>
      </Grid>
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        lg={4}
        className={classes.itemSpaceBottom}
      >
        <Button
          disabled
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={() => navigate("photos")}
          startIcon={<ImageIcon />}
        >
          Upload Photos
        </Button>
      </Grid>
    </Grid>
  );
};

export default StartPage;
