import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#0b5fa5" },
  secondary: { main: "#ffc000" },
  error: { main: "#a50b34" },
};
// #37474f was historically used in a presentation, if we ever need a tertiary colour
// https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=0b5fa5&secondary.color=ffc000

const typography = {
  useNextVariants: true,
};

const themeName = "Cecilian Archive";

export default createMuiTheme({ palette, typography, themeName });
