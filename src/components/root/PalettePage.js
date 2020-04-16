import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
  colourSwatch: ({ colour }) => ({
    backgroundColor: theme.palette[colour]?.main || "transparent",
    color: theme.palette.colour?.main
      ? theme.palette.getContrastText(theme.palette[colour].main)
      : theme.palette.primary.contrastText,
    minWidth: "6em",
    minHeight: "6em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
  }),
}));

const ColourSwatch = ({ colour }) => {
  const classes = useStyles({ colour });
  return (
    <Paper variant="outlined" square classes={{ root: classes.colourSwatch }}>
      {colour}
    </Paper>
  );
};

const hexToHSL = (H) => {
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};

const PalettePage = () => {
  const classes = useStyles();
  const theme = useTheme();

  const colours = Object.keys(theme.palette)
    .filter(
      (key) =>
        ![
          "primary",
          "secondary",
          "error",
          "warning",
          "info",
          "success",
        ].includes(key) && Object.keys(theme.palette[key]).includes("main")
    )
    .sort((aKey, bKey) => {
      const { h: aHue } = hexToHSL(theme.palette[aKey].main);
      const { h: bHue } = hexToHSL(theme.palette[bKey].main);
      return aHue < bHue ? -1 : 1;
    });

  return (
    <Grid
      className={classes.pageContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h4">Colour Palette</Typography>
      <Grid
        item
        xs={12}
        sm={10}
        md={10}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className={classes.pageTitleContainer}
      >
        {colours.map((colour) => (
          <ColourSwatch key={colour} colour={colour} />
        ))}
      </Grid>
    </Grid>
  );
};

export default PalettePage;
