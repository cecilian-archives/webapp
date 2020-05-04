import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#0b5fa5" }, //deepBlue
  secondary: { main: "#ffc000" }, //brightYellow
  error: { main: "#a50b34" }, //deepRed
  warning: { main: "#ff7700" }, //brightOrange
  info: { main: "#40bcd8" }, //brightBlue
  success: { main: "#29bf12" }, //brightGreen

  deepRed: { main: "#a50b34" },
  brightRed: { main: "#e3170a" },
  brightOrange: { main: "#ff7700" },
  brightYellow: { main: "#ffc000" },
  brightGreen: { main: "#38aa27" },
  deepGreen: { main: "#2b702f" },
  brightBlue: { main: "#40bcd8" },
  deepBlue: { main: "#0b5fa5" },
  deepPurple: { main: "#44355b" },
  brightPurple: { main: "#870058" },
  brightPink: { main: "#d81159" },
};
// https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=0b5fa5&secondary.color=ffc000

const typography = {
  useNextVariants: true,
};

const themeName = "Cecilian Archive";

export default createMuiTheme({ palette, typography, themeName });
