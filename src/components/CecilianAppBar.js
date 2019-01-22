import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/logo.png";

const styles = {
    root: {
        flexGrow: 1,
    },
    appTitle: {
        fontFamily: "Brawler, serif"
    },
    logo: {
        width: "20%",
        maxWidth: "50px",
        marginRight: "1rem"
    }
};

const CecilianAppBar = ({ classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="The Cecilian Archive logo" className={classes.logo}/>
                    <Typography variant="h6" color="inherit" className={classes.appTitle}>
                        Archive Uploader
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(CecilianAppBar);
