import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline } from "@material-ui/core";
import archiveTheme from "./theme";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// const graphqlClient = new ApolloClient({
//     uri: "",
// });

const ThemedApp = () => (
  <MuiThemeProvider theme={archiveTheme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline />
      <App />
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

// const ConnectedApp = () => (
//     <ApolloProvider client={graphqlClient}>
//         <ThemedApp />
//     </ApolloProvider>
// );

ReactDOM.render(<ThemedApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
