import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import logo1 from "../assets/cecilian_logo_c1970.jpg";
import logo2 from "../assets/cecilian_logo_c1990.jpg";
import logo3 from "../assets/cecilian_logo_c2000.jpg";
import logo4 from "../assets/cecilian_logo_c2007.png";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    minHeight: "70px",
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    width: "auto",
    maxHeight: "50px",
    marginLeft: "1%",
    marginRight: "1%",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing.unit,
    backgroundColor: "#fff",
    cursor: "pointer",
  },
});

const openLogo = logo => window.open(logo, "");

const CecilianLogosFooter = ({ classes }) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <img
        src={logo1}
        alt="Cecilian Society logo, circa 1960-1970"
        className={classes.logo}
        onClick={() => openLogo(logo1)}
      />
      <img
        src={logo2}
        alt="Cecilian Society logo, circa 1990"
        className={classes.logo}
        onClick={() => openLogo(logo2)}
      />
      <img
        src={logo3}
        alt="Cecilian Society logo, circa 2000"
        className={classes.logo}
        onClick={() => openLogo(logo3)}
      />
      <img
        src={logo4}
        alt="Cecilian Society logo, circa 2007"
        className={classes.logo}
        onClick={() => openLogo(logo4)}
      />
    </Grid>
  );
};

export default withStyles(styles)(CecilianLogosFooter);
