import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
    holder: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
    },
};

const Hold = ({ classes }) => {
    // yarn add react@next react-dom@next
    // https://reactjs.org/docs/hooks-state.html
    // const [visible, setVisible] = useState(false);
    // https://material-ui.com/demos/dialogs/#responsive-full-screen
    return (
        <div className={classes.holder}>
            <Button variant="contained" color="secondary">
                Start
            </Button>
        </div>
    );
};

export default withStyles(styles)(Hold);
