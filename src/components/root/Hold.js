import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import CloudCircleIcon from "@material-ui/icons/CloudCircle";

const styles = {
  holder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  button: {
    textTransform: "none",
    fontWeight: "bold",
  },
};

const Hold = ({ classes }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={classes.holder}>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={handleOpen}
        className={classes.button}
      >
        Oops&nbsp;
        <CloudCircleIcon className={classes.rightIcon} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Nothing Here Yet</DialogTitle>
        <DialogContent>
          <DialogContentText>We're working on it!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(withMobileDialog()(Hold));
