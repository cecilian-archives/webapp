import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline } from "@material-ui/core";
import archiveTheme from "./theme";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://europe-west2-cecilian-archives.cloudfunctions.net/api",
  }),
});

const ConnectedApp = () => (
  <ApolloProvider client={graphqlClient}>
    <MuiThemeProvider theme={archiveTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <App />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<ConnectedApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
