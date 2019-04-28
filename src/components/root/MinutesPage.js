import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Step0 from "../minutes/Step0";
import Step1 from "../minutes/Step1";
import Step2 from "../minutes/Step2";
import Step3 from "../minutes/Step3";

import { uppy } from "../minutes/fileUtils";

const styles = theme => ({
  link: {
    textDecoration: "none",
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontWeight: "bold",
    width: "100%",
  },
  itemSpaceTop: {
    marginTop: 10 * theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  itemSpaceBottom: {
    marginTop: theme.spacing.unit,
    marginBottom: 10 * theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  pageContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 2 * theme.spacing.unit,
      paddingRight: 2 * theme.spacing.unit,
    },
  },
  stepperContainer: {
    width: "100%",
  },
  stepper: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 3 * theme.spacing.unit,
  },
  stepContentsContainer: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit,
  },
});

const steps = [
  {
    title: "Welcome",
    render: () => <Step0 />,
  },
  {
    title: "Step 1",
    render: props => <Step1 {...props} />,
  },
  {
    title: "Step 2",
    render: props => <Step2 {...props} />,
  },
  {
    title: "Step 3",
    render: props => <Step3 {...props} />,
  },
];

const UploadStepper = ({ classes }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const numSteps = steps.length;
  const isLastStep = activeStep === numSteps - 1;
  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const prevStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const [item, setItem] = React.useState({
    type: "MINUTES",
    collection: "",
    associatedDate: null,
    archiveId: "",
    createdBy: "",
    acquisitionMethod: "",
    acquiredBy: "",
    notes: "",
    uploadedBy: "",
  });
  const [faunaRef, setFaunaRef] = React.useState(null);
  const [uppyInstance] = React.useState(uppy);

  const [uploadCompleted, setUploadCompleted] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);

  const resetState = () => {
    setItem({});
    setFaunaRef(null);
    uppyInstance.reset();
    setUploadCompleted(false);
    setUploadError(null);
    setActiveStep(-1);
  };

  if (activeStep < 0) return <Redirect to="/" />;

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
        className={classes.stepContentsContainer}
      >
        <Typography variant="h4">Minutes Upload</Typography>
        <Typography variant="h5">{steps[activeStep].title}</Typography>
        {steps[activeStep].render({
          item,
          setItem,
          faunaRef,
          setFaunaRef,
          setActiveStep,
          uppy: uppyInstance,
          uploadCompleted,
          setUploadCompleted,
          uploadError,
          setUploadError,
        })}
      </Grid>
      <Grid item xs={12} sm={10} md={8} className={classes.stepperContainer}>
        <MobileStepper
          steps={numSteps}
          position="static"
          className={classes.stepper}
          activeStep={activeStep}
          nextButton={
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={isLastStep ? resetState : nextStep}
              disabled={isLastStep && !uploadCompleted}
            >
              {isLastStep ? "Start Again" : "Next"}
              <KeyboardArrowRight className={classes.rightIcon} />
            </Button>
          }
          backButton={
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={prevStep}
              disabled={isLastStep && uploadCompleted}
            >
              <KeyboardArrowLeft className={classes.leftIcon} />
              Back
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(UploadStepper);
