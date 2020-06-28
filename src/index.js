import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { RecoilRoot } from "recoil";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline } from "@material-ui/core";
import archiveTheme from "./theme";
import App from "./App";
import { firebaseConfig } from "./config";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_APOLLO_API_URI,
  }),
  name: process.env.REACT_APP_NAME,
  version: process.env.REACT_APP_VERSION,
});

const ConnectedApp = () => (
  <ApolloProvider client={graphqlClient}>
    <RecoilRoot>
      <MuiThemeProvider theme={archiveTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  </ApolloProvider>
);

ReactDOM.render(<ConnectedApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
