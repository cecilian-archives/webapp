import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

const FirebaseLogin = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      "microsoft.com",
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      "apple.com",
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsSignedIn(!!user);
    });
  });

  return isSignedIn ? (
    <pre>Signed in as {JSON.stringify(user, null, 2)}</pre>
  ) : (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default FirebaseLogin;
