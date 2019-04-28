import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/logo.png";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  appTitle: {
    fontFamily: "Brawler, serif",
  },
  logo: {
    width: "100%",
    maxWidth: "50px",
    marginRight: "1rem",
  },
});

const CecilianAppBar = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img
              src={logo}
              alt="The Cecilian Archive logo"
              className={classes.logo}
            />
          </Link>
          <Typography variant="h6" color="inherit" className={classes.appTitle}>
            Cecilian Archive Uploader
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(CecilianAppBar);
