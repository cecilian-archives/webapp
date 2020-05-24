import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  appTitle: {
    fontFamily: "Brawler, serif",
  },
  logo: {
    width: "100%",
    maxWidth: "50px",
    marginRight: "1rem",
  },
}));

const CecilianAppBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img
              src={logo}
              alt="The Cecilian Archives logo"
              className={classes.logo}
            />
          </Link>
          <Typography variant="h6" color="inherit" className={classes.appTitle}>
            Cecilian Archives
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CecilianAppBar;
