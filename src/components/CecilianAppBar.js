import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
    root: {
        flexGrow: 1,
    },
};

const CecilianAppBar = ({ classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Archive Uploader
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(CecilianAppBar);
